# Frontend build stage
FROM node:21.5.0-alpine AS frontend-dev

WORKDIR /app

# Copy only package files first to leverage Docker cache for dependencies
COPY ./app/frontend/package.json ./app/frontend/package-lock.json ./

# Install dependencies
RUN npm install --save-dev @babel/plugin-proposal-private-methods --force

# Copy the rest of the application code
COPY ./app/frontend .

# Build the frontend
RUN npm run build

# Backend build stage
FROM python:3.9.6-alpine3.14 AS backend
LABEL maintainer="stupns"

ENV PYTHONUNBUFFERED 1

RUN adduser --disabled-password --no-create-home django-user && \
    mkdir -p /vol/web/media && \
    mkdir -p /vol/web/static && \
    chown -R django-user:django-user /vol && \
    chmod -R 755 /vol

WORKDIR /app

COPY --from=frontend-dev /app/build /app/frontend/build

COPY ./requirements.txt /tmp/
COPY ./requirements.dev.txt /tmp/

ARG DEV=false
RUN python -m ensurepip && \
    python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apk add --update --no-cache postgresql-client jpeg-dev && \
    apk add --update --no-cache --virtual .tmp-build-deps \
    build-base postgresql-dev musl-dev zlib zlib-dev linux-headers && \
    /py/bin/pip install --no-cache-dir -r /tmp/requirements.txt && \
    if [ "$DEV" = "true" ]; then /py/bin/pip install -r /tmp/requirements.dev.txt; fi && \
    apk del .tmp-build-deps && \
    rm -rf /var/cache/apk/* /tmp

ENV PATH="/py/bin:$PATH"

COPY ./app .

RUN chown -R django-user:django-user /app

USER django-user

EXPOSE 8000

FROM backend AS app-image

