const userRoute = require('./user.route')
const expenseRoute = require('./expense.route')
const expenseModel = require('../models/expense.model')
const { multipleMongooseToObject } = require('../utils')


function routes(app) {
    userRoute(app)
    expenseRoute(app)

    app.get('/', async (req, res, next) => {
        if (res.locals.authUser) {
            await expenseModel.find({ userId: res.locals.authUser._id })
                .populate('userId', '-password')
                .then(expenses => res.render('pages/home', {
                    expenses: multipleMongooseToObject(expenses)
                }))
                .catch(next)
        }
        else {
            res.render('pages/login', { singleBody: true })
        }
    })
}

module.exports = routes
