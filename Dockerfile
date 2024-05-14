FROM ubuntu:latest

COPY . .

RUN apt-get update
RUN apt-get install -y npm
RUN npm install --dev
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

CMD npm run serve

