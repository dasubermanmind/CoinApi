FROM node:14 as the_crypt

ENV NODE_ENV dev
ENV NODE_CONFIG_ENV dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 8280
CMD [ "node", "server.ts" ]