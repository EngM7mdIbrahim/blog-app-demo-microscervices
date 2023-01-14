FROM  node:14-alpine

WORKDIR /usr/posts-service

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]

