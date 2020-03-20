
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        { resource_name: 'identify workstation', resource_description: 'needed to start and build dev environment', project_id: 1 },
        { resource_name: 'identify server', resource_description: 'needed to start and publish', project_id: 3 },
        { resource_name: 'big conference room', resource_description: 'needed to hash out business logic', project_id: 2 },
      ]);
    });
};
