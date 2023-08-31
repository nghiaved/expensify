const path = require('path')
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')

require('./config')()

app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.engine('hbs', handlebars.create({ extname: '.hbs' }).engine)
app.set('view engine', 'hbs')

require('./routes')(app)

app.listen(5000, () => console.log(`App listening at http://localhost:5000`))
