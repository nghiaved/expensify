const { handleRegister, handleLogin } = require('../controllers/user.controller')

function routes(app) {
    app.post('/login', handleLogin)
    app.post('/register', handleRegister)
    app.get('/register', (req, res) => res.render('register', { singleBody: true }))
    app.get('/login', (req, res) => res.render('login', { singleBody: true }))
    app.get('/', (req, res) => res.render('home'))
}

module.exports = routes
