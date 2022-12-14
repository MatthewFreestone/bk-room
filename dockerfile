FROM python:3.10-slim
ENV PYTHONUNBUFFERED True

WORKDIR /app
COPY . ./

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "main.py"]