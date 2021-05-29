FROM node:latest

ADD . /app/

WORKDIR /app

RUN npm install

VOLUME /app/logs

CMD [ "npm", "start" ]
