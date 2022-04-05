const mongoose = require('mongoose')

const loadSchema = new mongoose.Schema({
    driverInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    },
    invoiceNumber: Number,
    loadNumber: {type: String, required: true},
    companyName: {type: String, required: true},
    rate: Number,
    emptyMilage: Number,
    loadedMilage: Number,
    comment: String,
    loadStatus: {type: String, default: 'open'},
    rateConfirmation: {
        data: Buffer,
        contentType: String
    },
    proofeOfDelivery: {
        data: Buffer,
        contentType: String
    },
    pickup: {
        pickLocation: String, pickDate: Date
    },
    stops: [
        {stop: String, date: Date}
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Load = mongoose.model('Load', loadSchema)
module.exports = Load