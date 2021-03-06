
exports.up = function(knex) {

  return knex.schema
    .createTable('user', table => {

      table
        .increments('id')
        .unsigned()
        .primary();
      table
        .uuid('uuid')
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .boolean('admin')
        .defaultTo(false);
      table
        .string('email')
        .unique()
        .notNullable();
      table
        .string('name')
        .nullable();
      table
        .string('profile_picture')
        .nullable();
      table
        .string('google_id')
        .nullable()
        .unique();
      table
        .string('password')
        .nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(null);

    })

    .createTable('token', table => {

      table
        .increments('id')
        .unsigned()
        .primary();
      table
        .string('token')
        .notNullable();
      table
        .integer('user_id')
        .unsigned()
        .references('user.id')
        .onDelete('CASCADE')
        .index();
      table.dateTime('expiration')
        .nullable();
      table.string('device')
        .nullable();
      table.timestamp('created_at')
        .defaultTo(knex.fn.now());
      table.timestamp('updated_at')
        .defaultTo(null);

    });

};

exports.down = function(knex) {

  return knex.schema
    .dropTableIfExists('token')
    .dropTableIfExists('user');

};
