const mongoose = require('mongoose')
const { model } = require('../db/connections')

const loadSchema = new mongoose.Schema({
    invoiceNumber: Number,
    loadNumber: {type: String, required: true},
    companyName: {type: String, required: true},
    rate: Number,
    emptyMilage: Number,
    loadedMilage: Number,
    rateConfirmation: {
        data: Buffer,
        contentType: String
    },
    stops: [
        {stop: String, date: Date}
    ]
})

const Load = mongoose.model('Load', loadSchema)
module.exports = Load