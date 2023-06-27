/* 
Ref: https://www.heady.io/blog/knex-migration-for-schema-and-seeds-with-postgresql
https://www.tabnine.com/code/javascript/functions/knex/schema
npm install knex knex-migrate
npx knex init
**update knexfile.js to use env
npx knex migrate:make migration_create_table
npx knex migrate:latest
*/

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  const tableName = 'boards';
  return knex.schema.createTable(tableName, function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('score').defaultTo(0);
    table.string('address', 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
exports.down = async function (knex) {
  const tableName = 'boards';
  await knex.schema.dropTable(tableName);
};
