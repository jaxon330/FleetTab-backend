const mongoose = require('mongoose')

const driverSchema = new mongoose.Schema({
    driver1: {
        firstName: String,
        lastName: String,
        phoneNumber: Number,
        homeAddress: String,
    },
    driver2: {
        driver2FirstName: String,
        driver2LastName: String,
        driver2PhoneNumber: Number,
        driver2HomeAddress: String,
    },
    truckNumber: Number,
    trailerNumber: {type: Number, default: 0},
    currentLocation: String,
    type: String,
    status: String,
    note: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})


const Driver = mongoose.model('Driver', driverSchema)
module.exports = Driver