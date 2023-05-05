# Turborepo starter

This is an official Yarn v1 starter turborepo.

## What's inside?

this repo is done with turbo repo, docker for development database, and next js for the client and server

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities/Usage

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

To develop all apps and packages and start the db, run the following command:
create a .env file inside the next js project with the following database url to match the docker db.

DATABASE_URL="postgresql://postgres:password@localhost:5432/mynewdb"

```
make sure you are in the root folder and run
yarn
yarn dev
```

### prerequisites

To use this project you need to already have installed yarn, docker.

### Running cypress tests suite
First navigate to the app directory (/app/hesp). Then run the command `yarn test` to open the test suite. From there you can run all tests or individual tests.
