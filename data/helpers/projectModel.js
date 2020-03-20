const db = require('../dbConfig.js');
const mappers = require('./mappers.js');

//need to add the update and remove function!!

module.exports = {
    get,
    insert,
    update,
    remove,
    getProjectTasks,
    getProjectResources,
};

function get(id) {
    let query = db('projects as p');

    if (id) {
        query.where('p.id', id).first();

        const promises = [query, getProjectTasks(id), getProjectResources(id)];

        return Promise.all(promises).then(function(results) {
            let [project, tasks, resources] = results;

            if (project) {
                project.tasks = tasks;
                project.resources = resources;

                return mappers.projectToBody(project);
            } else {
                return null;
            }
        });
    }
}

function insert(project) {
    return db('projects')
     .insert(project, 'id')
     .then(count => (count > 0 ? get(id) : null ));
}

function getProjectTasks(projectId) {
    return db('tasks')
    .where('project_id', projectId)
    .then(tasks => tasks.map(task => mappers.taskToBody(task)));
}

function getProjectResources(projectId) {
    return db('resources')
    .where('project_id', projectId)
    .then(resources => resources.map(resource => mappers.resourcesToBody(resource)));
}