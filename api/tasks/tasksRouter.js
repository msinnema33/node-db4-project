const express = require('express');
const router = express.Router();
const Tasks = require('../../data/helpers/tasksModel.js');

router.get('/', (req, res) => {
    Tasks.get()
    .then(tasks => {
        res.status(200).json(tasks)
    })
    .catch(err => res.status(500).json({ message: 'Failed to get tasks from database', error: err}))
})

router.get('/:id', (req, res) => {
    res.status(200).json(req.action)
})

router.post('/', (req, res) => {
    Tasks.insert(req.body)
    .then(task => res.status(201).json(task))
    .catch(err => res.status(500).json({ message: err}))
})

router.put('/:id', (req, res) => {
    const { id } = req.params

    Tasks.update(id, req.body)
    .then(() => {
        Tasks.get(id)
        .then((task) => {
            res.status(200).json(task)
        })
    })
    .catch(err => res.status(500).json({ message: 'Failed to update the task', error: err}))
})

router.delete(':id', (req, res) => {
    Tasks.remove(req.params.id)
    .then(task => res.status(204).end())
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to delete task', error: err})
    })
});

module.exports = router;