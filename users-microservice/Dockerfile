FROM node:16

ADD . /app/

WORKDIR /app

RUN npm install

EXPOSE 3001
VOLUME /app/logs

CMD npm start
