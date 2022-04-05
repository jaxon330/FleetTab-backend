const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const router = express.Router()


router.get('/', (req, res) => {
    res.send('Session working')
})

router.get('/', (req, res) => {
    
})

router.post('/register', async (req, res, next) => {
    try {
        if(req.body.password === req.body.verifyPassword && req.body.password != '') {
            const desiredUsername = req.body.username
            const userExists = await User.findOne({username: desiredUsername})
            if (userExists) {
                res.send('Username already taken')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(req.body.password, salt)
                req.body.password = hashedPassword
                const createdUser = await User.create(req.body)
                req.session.username = createdUser.username
                req.session._id = createdUser._id
                res.status(200).json(createdUser)
                console.log('new user is registed '+ createdUser);
                // res.redirect('/')
                // res.send('User registered and logged in')
                
            }
           
        } else {
            console.log('password must match');

        }

    } catch (err) {
        next(err)
    }
})

router.get('/login', (req, res) => {
    res.send('Login')
})

router.post('/login', async (req, res, next) => {
    try {
        const userToLogin = await User.findOne({username: req.body.username})
        if (userToLogin) {
            const validPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
            if(validPassword) {
                req.session.username = userToLogin.username
                
                console.log(userToLogin.username + ' User Logged in')
                res.status(200).json('ok')
            } else {
                console.log('Invalid username or password')
            }

        } else {
            console.log('Invalid username or password')
        }
    } catch (err) {
        res.json(error)
        next(err)
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    console.log('User logged out');
})

module.exports = router