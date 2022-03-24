const express = require('express')
const router = express.Router()
const Driver = require('../models/driver')

// Index Route

router.get('/drivers', (req, res) => {
    
    Driver.find({}, (error, drivers) =>{
        if(error) {
            console.log(error);
            res.status(400).json({error: error.message})
        } else {
            res.status(200).json(drivers)

        }
    })
})

// Create route

router.post('/drivers', (req, res) => {
    Driver.create(req.body, (error, createdDriver) => {
        if(error) {
            res.status(400).json({error: error.message});
        } else {
            res.status(200).json(createdDriver)
        }
    })
})

// show route
router.get('/drivers/:id', (req, res) => {
    Driver.findById(req.params.id, (error, driver) => {
        if(error) {
            res.status(400).json({error: error.message});
        } else {
            res.status(200).json(driver)
        }
    })
} )


// update route
router.put('/drivers/edit/:id', (req, res) => {
    Driver.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedDriver) => {
        if(error) {
            res.status(400).json({error: error.message});
        } else {
            res.status(200).json(updatedDriver)
        }
    })
})

// Delete route
router.delete('/drivers/:id', (req, res) => {
    Driver.findByIdAndDelete(req.params.id, (error, deletedDriver) => {
        if(error) {
            res.status(400).send({error: error.message})
        } else {
            res.status(200).json(deletedDriver)
        }
    })
})

module.exports = router