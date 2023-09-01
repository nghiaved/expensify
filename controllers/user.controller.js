const userModel = require('../models/user.model')

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
            if (!user)
                res.send(`User don't exist`)
            else if (password !== user.password)
                res.send(`Password invalid`)
            else {
                req.session.authUser = user
                res.redirect('/')
            }
        })
        .catch(next)
}

const handleLogout = async (req, res, next) => {
    req.session.authUser = null
    res.redirect('/')
}

module.exports = { handleRegister, handleLogin, handleLogout }
