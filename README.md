This personal version of Fullstack project using React, GraphQl and TypeScript (Tutorial by Ben Awad).

These are the following technologies covered - 
- Apollo Server
- PostgreSQL Database
- TypeORM
- Redis caching
- NextJS
- TypeGraphQL
- Chakra for UI design

***FOR BACKEND***

The tsconfig.json file is already configured. But feel free to modify it accoridingly.

**Prerequisites to run the server 
Redis-cli configured and running in the background.
PostgreSQL configured and a databse setup.
Create a .env file (this contains global variables) in fullstack-server and fill in the following parameters - 
*\
DATABASE_URL = postgresql://postgres:root@localhost:5432/{Name of your database}
REDIS_URL = 127.0.0.1:6379
PORT = 4000
SESSION_SECRET = {Any secret string, ex: hcdisjcdohfdusi}
CORS_ORIGIN = http://localhost:3000
*\

A docker setup file is also included. The docker image generated can be deployed on any PaaS platform for server hosting.

Post modifying .env files - 
$yarn gen

Build command - 
$ yarn build

Watch command - 
$yarn watch

Run command - 
$yarn dev
//Navigate to http://localhost:4000/graphql -> opens a graphql playground

*** FOR FRONTEND ***

Version of React - 16, other versions could throw errors. Syntax will need to be changed accordingly.
Latest chakra docs use different syntax for UI.
Create a .env.local file in fullstack-web and fill in the following parameter - 
\*
NEXT_PUBLIC_API_URL=http://localhost:4000/graphql
\*

Post modifying .env files - 
$yarn gen

Build command - 
$yarn build

Run command - 
$yarn dev

