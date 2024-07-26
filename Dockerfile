FROM node:20

WORKDIR /app

ARG FILE

RUN apt update
RUN apt install vim -y

RUN npm i -g pnpm@9.2.0
RUN npm i -g ts-node

COPY . .
# COPY ${FILE} .env

RUN pnpm i
RUN pnpm build

EXPOSE 3000
