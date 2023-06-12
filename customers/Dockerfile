FROM node:18.16.0-slim

WORKDIR /usr/apps/customers

COPY . .

RUN npm i -g @nestjs/cli@9.5.0

EXPOSE 9900
EXPOSE 9229

# Permite que o servidor nestjs reinicie após gerar uma migration pelo terminal
RUN apt-get update && apt-get install -y procps
