FROM node:8.11.4

RUN mkdir /home/node/client
WORKDIR /home/node/client

COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "start"]