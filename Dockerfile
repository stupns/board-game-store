FROM python:3.9.6-alpine3.14
LABEL maintainer="stupns"

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /tmp/
COPY ./requirements.dev.txt /tmp/requirements.dev.txt
COPY ./app /app/
WORKDIR /app
EXPOSE 8000
RUN adduser --disabled-password --no-create-home django-user


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