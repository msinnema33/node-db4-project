
exports.up = function(knex) {
  return knex.schema.createTable('projects', tbl => {
      tbl.increments();
      tbl.string('project_name', 128).notNullable();
      tbl.string('project_description', 255);
      tbl.boolean('completed').defaultTo(false);
  })
  .createTable('resources', tbl => {
      tbl.increments();
      tbl.string('resource_name', 128).notNullable().unique();
      tbl.integer('project_id').unsigned().notNullable().references('id')
      .inTable('projects')
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  })
  .createTable('tasks', tbl => {
      tbl.increments();
      tbl.string('task_description', 255).notNullable;
      tbl.blob('notes');
      tbl.boolean('completed').defaultTo(false);
      tbl.integer('project_id').unsigned().notNullable().references('id')
      .inTable('projects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tasks')
      .dropTableIfExists('resources')
      .dropTableIfExists('projects');
  
};
