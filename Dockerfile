FROM node:12.7.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
ADD src /usr/src/app/src
ADD public /usr/src/app/public
RUN apk add --no-cache bash
RUN npm run build
USER node

EXPOSE 3000 9229

CMD [ "npm", "start" ]
