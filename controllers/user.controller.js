const userModel = require('../models/user.model')
const { mongooseToObject } = require('../utils')


const handleRegister = async (req, res, next) => {
    const { username, password } = req.body
    await userModel.create({ username, password })
        .then(() => res.render('login', { singleBody: true }))
        .catch(next)
}

const handleLogin = async (req, res, next) => {
    const { username, password } = req.body
    await userModel.findOne({ username })
        .then(user => {
            !user
                ? res.send(`User don't exist`)
                : password !== user.password
                    ? res.send(`Password invalid`)
                    : res.render('home', { user: mongooseToObject(user) })
        })
        .catch(next)
}

module.exports = { handleRegister, handleLogin }
