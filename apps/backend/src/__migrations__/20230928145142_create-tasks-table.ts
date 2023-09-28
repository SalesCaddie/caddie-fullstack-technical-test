import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  await knex.schema.createTable('tasks', (table) => {
    table.uuid('id').primary();
    table.string('title').notNullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tasks');
}

