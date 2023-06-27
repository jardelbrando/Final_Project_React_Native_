
exports.up = function(knex) {
  return knex.schema.createTable('dishes', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('price').notNullable();
    table.string('description').notNullable();
    table.string('avatar_url').notNullable();
    table.string('category').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('dishes');
};
