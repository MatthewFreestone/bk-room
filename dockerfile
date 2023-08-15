FROM node:16.13.0-alpine3.14 AS build-stage
WORKDIR /app

COPY ./frontend/package.json ./
RUN npm install --production
COPY ./frontend .
RUN npm run build


FROM python:3.10-slim AS run-stage
ENV PYTHONUNBUFFERED True
ENV MONGO_ENV prod

WORKDIR /app

COPY ./backend/requirements.txt ./
RUN pip install -r requirements.txt
COPY ./backend .
COPY --from=build-stage /app/build /app/build
ENV REACT_BUILD_DIR /app/build/

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app
