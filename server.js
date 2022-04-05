require('dotenv').config()
const express = require('express')
const session = require('express-session')
const { PORT, SESSION_SECRET } = process.env
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const driverController = require('./controller/driverController')
const loadController = require('./controller/loadController')
const carrierDataController = require('./controller/carrierDataController')
const sessionsController = require('./controller/sessionsController')
const cors = require('cors')
require('./db/connections')
// Configuration
const app = express()



app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false}))

// const routeHit = (req, res, next) => {
//     console.log('A new route was just hit');
//     next()
// }
// app.use(routeHit)
// sessions
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
 
app.use((req, res, next) => {
    res.locals.username = req.session.username
    res.locals.loggedIn = req.session.loggedIn
    next()
})

// app.use((req, res, next) => {
//     if (req.session.loggedIn) {
//         next()
//     } else {
//         console.log('redirected to login page');
//     }
// })
// middleware to require authentication
const authRequired = (req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.status(200).json('ok')
    }
}

// custom middleware for flash messaging
app.use((req, res, next) => {
    res.locals.message = req.session.message
    req.session.message = ""
    next()
})
app.use('/', driverController)
app.use('/',  loadController)
// app.use('/', carrierDataController)
app.use('/sessions', sessionsController)


app.listen(process.env.PORT || 4000, (req, res) => {
    console.log('Server is running on port 4000')
})