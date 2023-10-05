const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseModel = new Schema({
    name: String,
    price: Number,
    type: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Expense', expenseModel)
