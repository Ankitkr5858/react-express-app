# React/Express application

## Prerequisites

Dependencies necessary for application:
* docker & docker-compose
* nodejs & npm

## Setup

```
docker-compose -f docker-compose.dev.yml up -d
```

## Backend

In order to run backend part of the application:

```
cd ./backend
cp .env.example .env
yarn install
yarn start
```

## Client

In order to run client part of the application:

```
cd ./client
yarn install
yarn start
```
