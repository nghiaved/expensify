const userRoute = require('./user.route')
const expenseRoute = require('./expense.route')
const expenseModel = require('../models/expense.model')
const { mongooseToObject, multipleMongooseToObject } = require('../utils')


function routes(app) {
    userRoute(app)
    expenseRoute(app)

    app.get('/create', (req, res) => res.render('pages/create'))
    app.get('/update/:id', async (req, res, next) => {
        await expenseModel.findOne({ _id: req.params.id })
            .populate('userId', '-password')
            .then(expense => res.render('pages/update', {
                expense: mongooseToObject(expense)
            }))
            .catch(next)
    })

    app.get('/', async (req, res, next) => {
        if (res.locals.authUser) {
            await expenseModel.find({ userId: res.locals.authUser._id })
                .populate('userId', '-password')
                .then(expenses => {
                    const arr = []
                    expenses.map(item => arr.push(item.type))
                    res.render('pages/home', {
                        expenses: multipleMongooseToObject(expenses),
                        type: Array.from(new Set(arr))
                    })
                })
                .catch(next)
        }
        else {
            res.render('pages/login', { singleBody: true })
        }
    })
}

module.exports = routes
