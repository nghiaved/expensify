const expenseModel = require('../models/expense.model')
const { multipleMongooseToObject } = require('../utils')

const handleCreate = async (req, res, next) => {
    const { name, price, type } = req.body
    const createdExpense = await expenseModel.create({ name, price, type, userId: res.locals.authUser._id })
    await expenseModel
        .findOne({ _id: createdExpense._id })
        .populate('userId', '-password')
        .then(expense => res.render('pages/create', { status: true }))
        .catch(next)
}

const handleRead = async (req, res, next) => {
    await expenseModel.find({ userId: res.locals.authUser._id })
        .populate('userId', '-password')
        .then(expenses => res.json(expenses))
        .catch(next)
}

const handleUpdate = async (req, res, next) => {
    await expenseModel.updateOne({ _id: req.params.expenseId }, req.query)
        .then(() => res.redirect('/'))
        .catch(next)
}

const handleDelete = async (req, res, next) => {
    await expenseModel.deleteOne({ _id: req.params.expenseId })
        .then(() => res.redirect('/'))
        .catch(next)
}

const handleSearch = async (req, res, next) => {
    if (req.query.type == 'All') res.redirect('/')
    await expenseModel.find({ type: req.query.type, userId: res.locals.authUser._id })
        .then(async expenses => {
            await expenseModel.find({ userId: res.locals.authUser._id })
                .then(all => {
                    const arr = []
                    all.map(item => arr.push(item.type))
                    res.render('pages/home', {
                        expenses: multipleMongooseToObject(expenses),
                        type: Array.from(new Set(arr))
                    })
                })
                .catch(next)
        })
        .catch(next)
}

module.exports = { handleCreate, handleRead, handleUpdate, handleDelete, handleSearch }
