const expenseModel = require('../models/expense.model')

const handleCreate = async (req, res, next) => {
    const { name, price } = req.body
    const createdExpense = await expenseModel.create({ name, price, userId: res.locals.authUser._id })
    await expenseModel
        .findOne({ _id: createdExpense._id })
        .populate('userId', '-password')
        .then(expense => res.redirect('/'))
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

module.exports = { handleCreate, handleRead, handleUpdate, handleDelete }
