FROM  node:16-alpine

ENV CI=true
ENV WDS_SOCKET_PORT=0


WORKDIR /usr/posts-service

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]

