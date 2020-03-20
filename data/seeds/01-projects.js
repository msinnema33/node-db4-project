
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        { project_name: 'build an API', project_description: 'make it a good one', completed: 'false'},
        { project_name: 'build out business logic', project_description: 'make it correct', completed: 'false'},
        { project_name: 'publish to Heroku', project_description: 'look what I can do', completed: 'false'}
      ]);
    });
};
