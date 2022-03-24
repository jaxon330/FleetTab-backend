const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const driverController = require('./controller/driverController')
const loadController = require('./controller/loadController')
const carrierDataController = require('./controller/carrierDataController')
const cors = require('cors')
app.use(cors())

require('./db/connections')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/', driverController)
app.use('/', loadController)
app.use('/', carrierDataController)
// app.use('/', (req, res) => {
//     res.send('Express working')
// })

app.listen(4000, (req, res) => {
    console.log('Server is running on port 4000')
})