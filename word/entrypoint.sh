#!/bin/sh

export PYTHONPATH=$PYTHONPATH:/usr/local/lib/python3.8/site-packages

echo "Waiting for MySQL to start"

while ! nc -z db 3306; do
  sleep 3
done

echo "MySQL started"

python3 manage.py makemigrations
python3 manage.py migrate

sleep 5

echo "Starting gunicorn at: $(date +%Y-%m-%d_%H:%M:%S)"
exec gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers=3 