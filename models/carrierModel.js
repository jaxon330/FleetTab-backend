const mongoose = require('mongoose')

const carrierSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Load'
    },
    location: String,
    finalStop: String,
    dateTime: Date,
    driverStatus: String,
    type: String,
    proofeOfDelivery: {
        data: Buffer,
        contentType: String
    },
    dispatch: String,
    note: String
})

const CarrierData = mongoose.model('CarrierData', carrierSchema)
module.exports = CarrierData