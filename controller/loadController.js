const express = require('express')
const router = express.Router()
const Load = require('../models/loadModel')

// Index route 
router.get('/loads', (req, res) => {
    Load.find({}, (error, allLoads) => {
        if(error) {
            res.status(400).json({error: error.message})
        } else {
            res.status(200).json(allLoads)
        }
    })
})

// Create route
router.post('/loads', (req, res) => {
    Load.create(req.body, (error, newLoad) => {
        if(error) {
            res.status(400).json({error: error.message})

        } else {
            res.status(200).json(newLoad)
        }
    })
})

// Show Route
router.get('/loads/:id', (req, res) => {
    Load.findById(req.params.id, (error, showLoad) => {
        if(error) {
            res.status(400).json({error: error.message})
        } else {
            res.status(200).json(showLoad)
        }
    })
})

// Update route
router.put('/loads/edit/:id', (req, res) => {
    Load.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedLoad) => {
        if(error) {
            res.status(400).json({error: error.message})
        } else {
            res.status(200).json(updatedLoad)
        }
    })
})

// Delete route
router.delete('/loads/:id', (req, res) => {
    Load.findByIdAndRemove(req.params.id, (error, deletedLoad) => {
        if(error) {
            res.send(200).json({error: error.message})
        } else {
            res.send(`${deletedLoad.companyName} load number ${deletedLoad.loadNumber} was deleted from the system!`)
        }
    })
})

module.exports = router