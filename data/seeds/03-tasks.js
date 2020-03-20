
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        { id: 1, task_description: 'go to supply', notes: 'need a high power laptop to code with', completed: 'false'}
      ]);
    });
};
