const express = require('express')
const { handleRegister, handleLogin, handleLogout } = require('../controllers/user.controller')

const router = express.Router()

const userRoute = app => {
    router.get('/register', (req, res) => res.render('pages/register', { singleBody: true }))
    router.get('/login', (req, res) => res.render('pages/login', { singleBody: true }))
    router.post('/login', handleLogin)
    router.post('/register', handleRegister)
    router.post('/logout', handleLogout)

    return app.use('/user', router)
}

module.exports = userRoute
