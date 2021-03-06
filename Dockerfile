FROM node:14 as the_crypt

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 8080
CMD [ "node", "server.ts" ]