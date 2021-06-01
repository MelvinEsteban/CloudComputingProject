# Stage 0: compile angular frontend
FROM node:latest AS builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build


# Stage 1: serve app with nginx server
FROM nginx:latest

COPY --from=builder /usr/src/app/dist/ui/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80