#!/bin/sh

echo "⏳ Esperando que MySQL esté disponible..."
# Espera 5 segundos para que MySQL levante (puedes usar wait-for-it.sh para algo más robusto)
sleep 5

echo "⚙️ Ejecutando makemigrations..."
python manage.py makemigrations --noinput

echo "⚙️ Ejecutando migrate..."
python manage.py migrate --noinput

echo "🚀 Iniciando servidor Django..."
python manage.py runserver 0.0.0.0:8000