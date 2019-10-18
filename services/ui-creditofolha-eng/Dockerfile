FROM node:10.13.0-alpine as builder

ARG CI
ARG REACT_APP_CREDITOR_BASE_URL
ARG REACT_APP_PUBLIC_URL
ARG REACT_APP_SENTRY_CREDITOR_BASE_DSN

WORKDIR /app
COPY package.json yarn.lock /app/
RUN apk add --no-cache \
        git \
    && cd /app && yarn
COPY . /app
RUN yarn test --watch=false --watchAll=false && yarn build


FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
