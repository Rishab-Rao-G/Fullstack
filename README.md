# PostEz
PostEz is a dynamic website created to either register new users or login existing users, who can create, update and delete their personal posts. They can also upvote or downvote other public posts.
> This is a personal version of Fullstack project using React, GraphQl and TypeScript (Tutorial by Ben Awad).


> This project has not been deployed to production, but has been configured in such a way that it can be pushed to production.

##### These are the following technologies covered - 
- Apollo Server
- PostgreSQL Database
- TypeORM
- Redis caching
- NextJS
- TypeGraphQL
- Chakra for UI design

#### FOR BACKEND

The tsconfig.json file is already configured. But feel free to modify it accoridingly.

##### Prerequisites to run the server

Redis-cli configured and running in the background.
PostgreSQL configured and a databse setup.
Create a .env file (this contains global variables) in fullstack-server and fill in the following parameters - 
```
  DATABASE_URL = postgresql://postgres:root@localhost:5432/{Name of your database} 
  REDIS_URL = 127.0.0.1:6379
  PORT = 4000
  SESSION_SECRET = {Any secret string, ex: hcdisjcdohfdusi}
  CORS_ORIGIN = http://localhost:3000
```

A docker setup file is also included. The docker image generated can be deployed on any PaaS platform for server hosting.

**Post modifying .env files**
```
$ yarn gen
```
**Build command**
```
$ yarn build
```
**Watch command** 
```
$ yarn watch
```
**Run command**
```
$ yarn dev
```
Navigate to ```http://localhost:4000/graphql``` to open a graphql playground to test backend queries.

#### FOR FRONTEND
For front end development React16 is used, other versions could possibly throw errors. 
Latest chakra docs use different syntax for UI.
Create a .env.local file in fullstack-web and fill in the following parameter - 
```
NEXT_PUBLIC_API_URL=http://localhost:4000/graphql
```

**Post modifying .env files**
```
$ yarn gen
```
**Build command**
```
$ yarn build
```
**Run command**
```
$ yarn dev
```
Navigate to ```http://localhost:3000/``` for front-end UI
