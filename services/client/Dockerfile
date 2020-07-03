# build environment
FROM node:alpine as build

RUN apk add --update \
  build-base \
  git \
  openssh-client

# Create app directory (with user `node`)
RUN mkdir -p /home/node/client/

WORKDIR /home/node/client

COPY package*.json /home/node/client/
RUN npm install
RUN npm config set unsafe-perm true
RUN npm install react-scripts@3.0.1 -g
COPY . /home/node/client
RUN npm run build

# production environment
FROM nginx:1.17.3-alpine
COPY --from=build /home/node/client/build /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html/static
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
