const express = require('express')
const router = express.Router()
const CarrierData = require('../models/carrierModel')

// Index route
router.get('/', (req, res) => {
    CarrierData.find()
    .populate('driver')
    .populate('order')
    .exec(function (error, allData)  {
        if(error) {
            res.status(400).json({error: error.message})
        } else {
            res.status(200).json(allData)
        }
    })
})

// Create route
router.post('/', async (req, res) => {
    try {
        const newData = await CarrierData.create(req.body) 
        const driverModel = await newData.populate('driver')  
        const loadModel = await driverModel.populate('order')
        res.status(200).json(loadModel)
    } catch (error) {
        console.error(error)
    }
    
})

// Show route
router.get('/:id', (req, res) => {
    CarrierData.findById(req.params.id)
    .populate('driver')
    .populate('order')
    .exec( (error, showData)  => {
        if(error) {
            res.status(400).json({error: error.message})
        } else {
            res.status(200).json(showData)
        }
    })
})

//  Update route
router.put('/edit/:id', (req, res) => {
    CarrierData.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .populate('driver')
    .populate('order')
    .exec((error, updateData) => {
        if(error) {
            res.status(400).json({error: error.message})
        } else {
            res.status(200).json(updateData)
        }
    })
})

// Delete route
router.delete('/:id', (req, res) => {
    CarrierData.findByIdAndRemove(req.params.id)
    .populate('driver')
    .populate('order')
    .exec( (error, deletedData)  => {
        if(error) {
            res.status(400).json({error: error.message})
        } else {
            res.send(`Truck number ${deletedData.driver.truckNumber} was removed from Truck List!`)
        }
    })
})

module.exports = router