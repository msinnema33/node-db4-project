const express = require('express');
const router = express.Router();
const projectModel = require('../../data/helpers/projectModel.js');
const Tasks = require('../../data/helpers/tasksModel.js');

router.get('/', (req, res) => {

    projectModel.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Failed to get projects"});
    });
});

router.get('/:id/tasks', (req, res) => {
    const {id} = req.params

    Tasks.get(id)
    .then(tasks => {
        res.status(200).json(tasks)
    })
    .catch(err => res.status(500).json({ message: "Failed to get tasks from database", error: err}))
})

router.post('/', (req, res) => {
    console.log(req.body)
    
    projectModel.insert(req.body)
    .then(project => res.status(201).json(project))
    .catch(err => {
        console.log("projectRouter POST 500 error:", err)
        res.status(500).json({ message: err})
    })
})

router.put('/:id', (req, res) => {
    projectModel.update(id, body)
    .then(() => {
        projectModel.get(id)
        .then((project) => {
            res.status(200).json(project)
        })
    })
    .catch(err => res.status(500).json({ message: err}))
})

router.delete('/:id', (req, res) => {
    projectModel.remove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: err})
    })
});

module.exports = router;
