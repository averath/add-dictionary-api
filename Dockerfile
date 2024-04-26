FROM node:20.11-alpine3.18 as server-build

RUN apk update && \
    apk add --no-cache python3 make g++ && \
    ln -sf python3 /usr/bin/python

WORKDIR /usr/src/app
COPY . ./api

WORKDIR /usr/src/app/api
ENV ENV production
RUN yarn install && yarn run build

CMD ["yarn", "start"]
