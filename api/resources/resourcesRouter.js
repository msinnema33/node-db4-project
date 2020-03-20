const express = require('express');
const router = express.Router();
const Resources = require('../../data/helpers/resourceModel.js');

router.get('/', (req, res) => {
    Resources.get()
    .then(resourses => {
        res.status(200).json(resourses)
    })
    .catch(err => res.status(500).json({ message: 'Failed to the resources from database', error: err}))
})

router.get('/:id', (req, res) => {
    res.status(200).json(req.resource)
})

router.post('/', (req, res) => {
    Resources.insert(req.body)
    .then(resource => res.status(201).json(resource))
    .catch(err => res.status(500).json({ message: err}))
})

router.put('/:id', (req, res) => {
    const { id } = req.params

    Resources.update(id, req.body)
    .then(() => {
        Resources.get(id)
        .then((resource) => {
            res.status(200).json(resource)
        })
    })
    .catch(err => res.status(500).json({ message: 'Failed to update the resource', error: err}))
})

router.delete(':id', (req, res) => {
    Resources.remove(req.params.id)
    .then(resource => res.status(200).end()) // add resource??
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to delete resource', error: err})
    })
});

module.exports = router;