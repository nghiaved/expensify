const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseModel = new Schema({
    name: String,
    price: Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
})

module.exports = mongoose.model('Expense', expenseModel)
