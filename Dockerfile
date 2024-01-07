# Frontend build stage
FROM node:14-alpine AS frontend

WORKDIR /frontend

# Copy only package files first to leverage Docker cache for dependencies
COPY ./frontend/package.json ./frontend/package-lock.json ./

# Install dependencies
RUN npm install
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object

# Copy the rest of the application code
COPY frontend .

# Build the frontend
RUN npm run build

# Backend build stage
FROM python:3.9.6-alpine3.14 AS backend
LABEL maintainer="stupns"

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /tmp/
COPY ./requirements.dev.txt /tmp/requirements.dev.txt
COPY ./app /app/
WORKDIR /app
EXPOSE 8000
RUN adduser --disabled-password --no-create-home django-user && \
    mkdir -p /vol/web/media && \
    mkdir -p /vol/web/static && \
    chown -R django-user:django-user /vol && \
    chmod -R 755 /vol


ARG DEV=false
RUN python -m ensurepip && \
    python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apk --update add --virtual build-dependencies python3-dev build-base \
    && /py/bin/pip install --no-cache-dir -r /tmp/requirements.txt \
    && if [ "$DEV" = "true" ]; then /py/bin/pip install -r /tmp/requirements.dev.txt; fi \
    && rm -rf /tmp \
    && apk del build-dependencies \
    && rm -rf /var/cache/apk/* /tmp

ENV PATH="/py/bin:$PATH"

USER django-user

FROM backend AS app-image

COPY --from=frontend /frontend/build /app/frontend