
## Getting started

This guide assumes that you've read and followed the general getting started guide in the root of this repo.

## Things to install
- Nest CLI
  -  `npm install -g @nestjs/cli`

## Development

To start a development server with the backend app, follow the steps below,


- Make a copy of the `env.example` file in this project folder and rename it to `.env`, to make local environment variables available to you.
- Make sure you've followed the Getting started guide in root repo.
- Run `nx serve backend (Ignore this if youre already running the project using `run-many`).
- Use the URL from the terminal output to view the project.

## Technologies used

- NestJS
- PostgreSQL
- TypeORM
- Express

## DB Migrations

- Database migrations are managed by each individual project, and in this case is managed using [knex](https://github.com/knex/knex)
- We're not using TypeORM for migrations because of the complexities involved in using it with Typescript and NX.
- Migrations are executed as part of the deployment cycle and are run automatically when the app startup.

### Create migrations to run

- You can apply migrations to your local db container by running `nx migrations:to-latest backend`
- you can run `nx migrations:make backend --name=<migration name>` to automatically generate a migration file in `src/__migrations__`.
- You can specify a migration to run by creating a file in `src/__migrations__/` folder
- You can follow the below example to create migration files.

```typescript  
import { Knex } from "knex";  
  
export async function up(knex: Knex): Promise<void> {  
  await knex.schema.createTable("example", (table) => {  
    table.uuid("id").primary();  
    table.string("name").notNullable();  
  });  
}  
  
export async function down(knex: Knex): Promise<void> {  
  await knex.schema.dropTable("todos");  
}  
  
```

### Running migrations locally
-  Migrations are run automatically when to restart your dev server,To apply migrations to your local DB container manually , you can run `nx migrations:to-latest backend`
- Make sure that you have a running session of `nx backend serve`(This will start up the postgres db container on your machine)
