const express = require('express')
const { handleCreate, handleRead, handleUpdate, handleDelete, handleSearch } = require('../controllers/expense.controller')

const router = express.Router()

const expenseRoute = app => {
    router.post('/create', handleCreate)
    router.get('/read', handleRead)
    router.get('/update/:expenseId', handleUpdate)
    router.get('/delete/:expenseId', handleDelete)
    router.get('/search', handleSearch)

    return app.use('/expense', router)
}

module.exports = expenseRoute
