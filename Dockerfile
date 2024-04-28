FROM node:21

WORKDIR /usr/src/app

COPY . .

RUN yarn install

RUN yarn build

RUN rm -rf ./src

EXPOSE 8000

CMD ["yarn", "run", "prod"]