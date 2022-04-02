const express = require('express')
const router = express.Router()
const Load = require('../models/loadModel')

// Index route 
router.get('/loads', (req, res) => {
    Load.find().populate('driverInfo').exec((error, allLoads) => {
        if(error) {
            res.status(400).json({error: error.message})
        } else {
            res.status(200).json(allLoads)
        }
    })
})

// Create route

router.post('/loads', async (req, res) => {
    try {
        const newData = await Load.create(req.body) 
        const driverInfo = await newData.populate('driverInfo')  
        res.status(200).json(driverInfo)
    } catch (error) {
        console.error(error)
    }
    
})

// Show Route
router.get('/loads/:id', (req, res) => {
    Load.findById(req.params.id).populate('driverInfo').exec((error, showLoad) => {
        if(error) {
            res.status(400).json({error: error.message})
        } else {
            res.status(200).json(showLoad)
        }
    })
})

// Update route
router.put('/loads/edit/:id', (req, res) => {
    Load.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('driverInfo').exec((error, updatedLoad) => {
        if(error) {
            res.status(400).json({error: error.message})
        } else {
            res.status(200).json(updatedLoad)
        }
    })
})

// Delete route
router.delete('/loads/:id', (req, res) => {
    Load.findByIdAndRemove(req.params.id).populate('driverInfo').exec((error, deletedLoad) => {
        console.log(error);
        if(error) {
            res.status(400).json({error: error.message})
        } else {
            res.status(200).json(deletedLoad)
        }
    })
})

module.exports = router