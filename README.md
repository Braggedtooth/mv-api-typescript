# <p align="center">
<a href=https://github.com/Braggedtooth/mv-api-typescript target="_blank">
<img src='/placeholder.jpg' width="100%" alt="Banner" />
</a>
</p>



<p align="center">
<img src="https://img.shields.io/github/languages/code-size/Braggedtooth/mv-api-typescript" alt="GitHub code size in bytes" />
<img src="https://img.shields.io/github/last-commit/Braggedtooth/mv-api-typescript" alt="GitHub last commit" />
<img src="https://img.shields.io/github/commit-activity/m/Braggedtooth/mv-api-typescript" alt="GitHub commit activity month" />
<img src="https://img.shields.io/github/license/Braggedtooth/mv-api-typescript" alt="GitHub license" />
</p>

<p></p>
<p></p>

# 📌 Overview

mv-api-typescript is a backend REST API project that serves as the rewrite for the mv-frontend application. It utilizes various essential dependencies such as Prisma, NestJS, Axios, and Passport for authentication. Other notable dependencies include bcrypt for password hashing, class-transformer and class-validator for data validation, and Swagger for API documentation. The project also includes testing frameworks like Jest and Supertest, as well as linting tools like ESLint and Prettier.

## 🔍 Table of Contents

* [📁 Project Structure](#project-structure)

* [📝 Project Summary](#project-summary)

* [💻 Stack](#stack)

* [⚙️ Setting Up](#setting-up)

* [🚀 Run Locally](#run-locally)

* [🙌 Contributors](#contributors)

* [☁️ Deploy](#deploy)

* [📄 License](#license)

## 📁 Project Structure

```bash
├── .env.example
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── README.md
├── nest-cli.json
├── package-lock.json
├── package.json
├── prisma
│   ├── dbml
│   │   └── schema.dbml
│   ├── migrations
│   │   ├── 20220601233524_init_db
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── auth
│   │   ├── auth.controller.spec.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.spec.ts
│   │   ├── auth.service.ts
│   │   ├── dto
│   │   │   ├── jwt.dto.ts
│   │   │   └── login.dto.ts
│   │   └── password
│   │       ├── jwt.strategy.ts
│   │       ├── password.service.spec.ts
│   │       └── password.service.ts
│   ├── common
│   │   ├── CONSTANTS.ts
│   │   ├── config
│   │   │   ├── config.interface.ts
│   │   │   └── config.ts
│   │   ├── decorators
│   │   │   ├── public.decorator.ts
│   │   │   ├── role.decorator.ts
│   │   │   └── status.decorator.ts
│   │   ├── dtos
│   │   │   └── create-user.dto.ts
│   │   ├── guards
│   │   │   ├── jwt.guard.spec.ts
│   │   │   ├── jwt.guard.ts
│   │   │   ├── role.guard.spec.ts
│   │   │   ├── role.guard.ts
│   │   │   ├── status.guard.spec.ts
│   │   │   └── status.guard.ts
│   │   ├── middleware
│   │   │   └── logging.middleware.ts
│   │   ├── models
│   │   │   ├── req.model.ts
│   │   │   ├── token.model.ts
│   │   │   └── user.model.ts
│   │   └── types
│   │       └── user.model.ts
│   ├── healthcheck
│   │   ├── db.healthcheck.ts
│   │   └── status.healthcheck.ts
│   ├── main.ts
│   └── users
│       ├── dto
│       │   └── update-user.dto.ts
│       ├── users.controller.spec.ts
│       ├── users.controller.ts
│       ├── users.module.ts
│       ├── users.service.spec.ts
│       └── users.service.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json
```

## 📝 Project Summary

- [prisma](prisma): Database ORM and migration tool.
- [src](src): Main source code directory.
- [src/auth](src/auth): Authentication related components.
- [src/common](src/common): Common functionalities and utilities.
- [src/healthcheck](src/healthcheck): Endpoint for health checks.
- [src/users](src/users): User related components.
- [src/users/dto](src/users/dto): Data transfer objects for user operations.
- [test](test): Directory for tests.
- [prisma/migrations](prisma/migrations): Database migration scripts.
- [prisma/dbml](prisma/dbml): Database schema definition using DBML language.

## 💻 Stack

- [nestjs/jwt](https://github.com/nestjs/jwt): JWT authentication for NestJS.
- [nestjs/passport](https://github.com/nestjs/passport): Authentication middleware for NestJS.
- [nestjs/platform-express](https://github.com/nestjs/platform-express): Express integration for NestJS.
- [prisma/client](https://github.com/prisma/prisma): Prisma client for database access and management.
- [class-validator](https://github.com/typestack/class-validator): Validation library for TypeScript and JavaScript.
- [nestjs-prisma](https://github.com/prisma/nestjs-prisma): Prisma integration for NestJS.
- [nestjs/swagger](https://github.com/nestjs/swagger): Swagger module for NestJS to generate API documentation.
- [nestjs/testing](https://github.com/nestjs/testing): Testing utilities for NestJS.

## ⚙️ Setting Up

#### POSTGRES_USER
- Choose a username for the PostgreSQL database.
- Ensure that the username follows the naming conventions and security best practices.
- Use a secure password for the user account.
- Avoid using common or easily guessable usernames.

#### POSTGRES_PASSWORD
- Generate a strong and secure password for the PostgreSQL user account.
- Use a combination of uppercase and lowercase letters, numbers, and special characters.
- Ensure that the password is not easily guessable or common.
- Consider using a password manager to generate and store the password securely.

#### POSTGRES_DB
- Decide on a name for the PostgreSQL database.
- Choose a name that reflects the purpose or content of the database.
- Ensure that the database name follows the naming conventions and guidelines.
- Avoid using reserved keywords or special characters in the database name.

#### DB_HOST
- If running locally, set the value to the hostname or IP address of the PostgreSQL database server.
- If running in a Docker container, set the value to the hostname or container name of the PostgreSQL database container.

#### DB_PORT
- Specify the port number on which the PostgreSQL database server is running.
- The default port for PostgreSQL is 5432.
- If using a non-default port, provide the appropriate port number.

#### JWT_ACCESS_SECRET
- Generate a secure secret key for signing access tokens.
- Use a random string of characters with sufficient length.
- Store the secret key securely and avoid sharing it publicly.

#### JWT_REFRESH_SECRET
- Generate a secure secret key for signing refresh tokens.
- Use a random string of characters with sufficient length.
- Store the secret key securely and avoid sharing it publicly.

## 🚀 Run Locally
1.Clone the mv-api-typescript repository:
```sh
git clone https://github.com/Braggedtooth/mv-api-typescript
```
2.Install the dependencies with one of the package managers listed below:
```bash
pnpm install
bun install
npm install
yarn install
```
3.Start the development mode:
```bash
pnpm dev
bun dev
npm run dev
yarn dev
```
[Api documentation by swagger](http://localhost:3000/docs)

## 🙌 Contributors
<a href="https://github.com/Braggedtooth/mv-api-typescript/graphs/contributors">
<img src="https://contrib.rocks/image?repo=Braggedtooth/mv-api-typescript" />
</a>

## ☁️ Deploy

`[Application name](Your App URL)`

## 📄 License

[**Add Your License**](https://choosealicense.com)


 
