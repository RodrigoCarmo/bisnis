FROM node:18.16.0-slim

WORKDIR /usr/apps/**NOME DO PROJETO**

COPY . .

RUN npm i -g @nestjs/cli@9.5.0

EXPOSE 3001

# Permite que o servidor nestjs reinicie após gerar uma migration pelo terminal
RUN apt-get update && apt-get install -y procps

# Não é recomendado, porém, permite que o nestjs exclua a pasta dist ao gerar uma mudança (deve ser usado apenas em dev)
RUN npm run build
RUN sudo chmod -R 777 dist

CMD [ "npm", "run", "start:dev" ]