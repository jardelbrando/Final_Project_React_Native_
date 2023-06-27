
exports.up = function(knex) {
  return knex.schema.createTable('orders', table => {
    table.increments('id').primary();
    table.integer('table_number').notNullable();
    table.integer('dishe_id').notNullable();
    table.integer('quantity').notNullable();
    table.boolean('started');
    table.boolean('finished');
    table.string('observation');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('orders');
};
