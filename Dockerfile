FROM python:3.8-slim-buster

EXPOSE 5000

WORKDIR /app

COPY . .

RUN apt-get update
RUN apt-get install -y npm nodejs

RUN pip install -r requirements.txt

RUN npm install
RUN npm run-script build

CMD python server.py