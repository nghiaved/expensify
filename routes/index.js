const { handleRegister, handleLogin, handleLogout } = require('../controllers/user.controller')

function routes(app) {
    app.get('/register', (req, res) => res.render('register', { singleBody: true }))
    app.get('/login', (req, res) => res.render('login', { singleBody: true }))
    app.post('/login', handleLogin)
    app.post('/register', handleRegister)
    app.post('/logout', handleLogout)
    app.get('/', (req, res) => {
        res.locals.authUser
            ? res.render('home')
            : res.render('login', { singleBody: true })
    })
}

module.exports = routes
