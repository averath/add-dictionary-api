# Table of contents

-   [General info](#general-info)
-   [Technologies](#technologies)
-   [Configuration](#configuration)
-   [Quick start](#quick-start)
-   [Tests](#tests)

## General info

### Introduction

This API allows processing the data sent from the client side. The data is sent to the API and then processed according to the established logic. Depending on the data received, the API may return an error message or positively acknowledge the processing of the request. The application uses technologies such as Node.js and Express.js to ensure that the API runs quickly and efficiently.

## Technologies

Project is created with:

-   [Nodejs](https://nodejs.org/)
-   [Express](https://expressjs.com/)
-   [Typescript](https://www.typescriptlang.org/)
-   [Knexjs](https://knexjs.org/)
-   [Docker](https://www.docker.com/)
-   Yarn

## Quick start

Quick start:

1. Create a `.env` file in the project's root directory and fill variables:

**_The application will connect to the database based on the ENV variable!_**

```bash
PORT=
ENV=

PROD_DB_HOST=
PROD_DB_PORT=
PROD_DB_NAME=
PROD_DB_TABLE=
PROD_DB_PASSWORD=
PROD_DB_USER=

DEV_DB_HOST=
DEV_DB_PORT=
DEV_DB_NAME=
DEV_DB_TABLE=
DEV_DB_USER=
DEV_DB_PASSWORD=
```

2. Install dependencies: `yarn install`.
3. Build project: `yarn build`

    Go to the `./dist` to see the compiled project files.

4. Copy `.env` file to `./dist` directory.
5. Copy dist content to `api` directory on server.
6. Install dependencies on server (`api` directory) by typing `yarn install`.
7. Application will start automatically due to configuration.

## Tests

To run tests, follow these steps:

1. Make sure you have installed all dependencies: npm install or yarn

2. Run these command:

```bash
yarn test
```

