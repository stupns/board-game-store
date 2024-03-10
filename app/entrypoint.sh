#!/bin/sh

# Collect static files
echo "Collect static files"
python manage.py collectstatic --noinput

# Apply database migrations
echo "Apply database migrations"
python manage.py migrate

# Start Gunicorn server
echo "Starting Gunicorn server"
gunicorn app.wsgi:application --bind 0.0.0.0:8000