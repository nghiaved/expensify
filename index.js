const path = require('path')
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
require('./config')()

app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.engine('hbs', handlebars.create({
    extname: '.hbs',
    helpers: {
        'sum': (a, b) => (a + b),
        'price': (price) => {
            let value = price.toString().split('').reverse()
            let priceEnd = ''
            value.map((item, index) => {
                if (++index % 3 == 0 && index != value.length) {
                    item += '.'
                }
                priceEnd += item
            })
            return priceEnd.split('').reverse().join('')
        },
        'total': (data) => {
            const value = data.reduce(function (total, num) {
                return total + num.price
            }, 0)
            let price = value.toString().split('').reverse()
            let priceEnd = ''
            price.map((item, index) => {
                if (++index % 3 == 0 && index != price.length) {
                    item += '.'
                }
                priceEnd += item
            })
            return priceEnd.split('').reverse().join('')
        },
    },
}).engine)
app.set('view engine', 'hbs')

app.set('trust proxy', 1)
app.use(require('express-session')({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {}
}))

app.use(function (req, res, next) {
    res.locals.authUser = req.session.authUser

    next()
})

require('./routes')(app)

app.listen(5000, () => console.log(`App listening at http://localhost:5000`))
