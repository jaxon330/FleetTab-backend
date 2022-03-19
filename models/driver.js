const mongoose = require('mongoose')

const driverSchema = new mongoose.Schema({
    firstName: {type: String, require: true},
    lastName: String,
    phoneNumber: Number,
    truckNumber: Number,
    trailerNumber: Number
})

const Driver = mongoose.model('Driver', driverSchema)
module.exports = Driver