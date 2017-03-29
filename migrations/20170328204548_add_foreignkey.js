
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('milestones', (table) => {
      table.foreign('id').references('id').inTable('famous_people');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('milestones', (table) => {
      table.dropForeign(columns, 'id')
    })
  ])
};
