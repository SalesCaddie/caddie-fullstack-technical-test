import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('tasks', (table) => {
    table.text('description').nullable();
    table.timestamp('dueDate').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('tasks', (table) => {
    table.dropColumn('description');
    table.dropColumn('dueDate');
  });
}
