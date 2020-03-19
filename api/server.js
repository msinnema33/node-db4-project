const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const ProjectRouter = require('./projects/projectsRouter.js');
const ResourcesRouter = require('./resources/resourcesRouter.js');
const TasksRouter = require('./tasks/tasksRouter.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('./api/projects', ProjectRouter);
server.use('./api/resources', ResourcesRouter);
server.use('./api/tasks', TasksRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: "API is up and running!!"});
});

module.exports = server;