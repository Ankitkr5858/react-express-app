FROM node:12-alpine as client_builder

WORKDIR /client
COPY client/package.json /client/package.json
COPY client/yarn.lock /client/yarn.lock
RUN yarn install
COPY ./client /client
RUN yarn build --prod

FROM node:12-alpine

WORKDIR /app
COPY backend/package.json /app/package.json
COPY client/yarn.lock /client/yarn.lock
RUN yarn install
COPY ./backend /app
COPY --from=client_builder /client/build /app/public

CMD ["node", "bin/www"]
