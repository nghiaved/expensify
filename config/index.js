const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/expensify', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connect successfully!')
    } catch (error) {
        console.log('Connect failure!')
    }
}

module.exports = connectDB