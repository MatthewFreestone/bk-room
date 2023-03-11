FROM node:16.13.0-alpine3.14 as build-stage
WORKDIR /app

COPY ./frontend/package.json ./
RUN npm install
COPY ./frontend .
RUN npm run build


FROM python:3.10-slim as run-stage
ENV PYTHONUNBUFFERED True
ENV MONGO_ENV prod
ENV PORT 8080

WORKDIR /app

COPY ./backend/requirements.txt ./
RUN pip install -r requirements.txt
# COPY ./.env ./
COPY ./backend .
COPY --from=build-stage /app/build ./frontend/build
ENV STATIC_FOLDER frontend/build/static
ENV REACT_INDEX frontend/build/index.html

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app
