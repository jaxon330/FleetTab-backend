const mongoose = require('./connections')
const Driver = require('../models/driver')
const driverSeeds = require('./driverSeeds')

Driver.deleteMany({})
.then(() => {
})
.then(() => {
    return Driver.insertMany(driverSeeds)
})
.then(data => console.log(data))
.catch(err => console.log(err))
.finally(() => {
    process.exit()
})