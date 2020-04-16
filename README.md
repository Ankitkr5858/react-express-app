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
pushd ./backend
cp .env.example .env
yarn install
yarn start
popd
```

## Client
