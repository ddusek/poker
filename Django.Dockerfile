# docker build --file Dockerfile --tag poker .
# docker run --tty --interactive --volume $PWD/:/poker/ poker bash

FROM python:3.6

ENV PYTHONBUFFERED 1

RUN mkdir /poker
WORKDIR /poker

COPY requirements.txt requirements.txt
COPY manage.py manage.py
COPY api/ api/
COPY frontend/ frontend/
COPY gameplay/ gameplay/
COPY gameplay_utils/ gameplay_utils
copy poker_app/ poker_app/
COPY user/ user/
COPY scripts/ scripts/

RUN pip install -r requirements.txt

EXPOSE 8000

ENTRYPOINT ["./scripts/django-entrypoint.sh"]