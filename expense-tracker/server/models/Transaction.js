const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: [true, "Enter valid text !"],
    },
    amount: {
        type: Number,
        required: [true, "Enter valid amount !"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Transaction', transactionSchema)