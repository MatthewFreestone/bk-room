FROM node:16.13.0-alpine3.14 as front-build-stage
WORKDIR /app

COPY ./frontend/package.json ./
RUN npm install
COPY ./frontend .
RUN npm run build


FROM python:3.10-slim as run-stage
ENV PYTHONUNBUFFERED True
ENV MONGO_ENV prod
WORKDIR /app

COPY ./requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . ./
COPY --from=front-build-stage /app/build ./frontend/build

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app



# FROM python:3.10-slim
# ENV PYTHONUNBUFFERED True
# ENV MONGO_ENV prod

# WORKDIR /app
# COPY . ./

# RUN pip install --no-cache-dir -r requirements.txt

# CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app