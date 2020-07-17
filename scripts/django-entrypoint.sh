#!/usr/bin/env bash

# Make database migrations
echo "Make database migrations"
python manage.py makemigrations game user

# Apply database migrations
echo "Apply database migrations"
python manage.py migrate

# Create a Django super user 'admin'
echo "Create super user 'admin'"
echo "from django.contrib.auth import get_user_model; User = get_user_model(); \
User.objects.create_superuser('admin', '', 'admin')" | python manage.py shell

# Start server
echo "Starting server"
python manage.py runserver 0.0.0.0:8000