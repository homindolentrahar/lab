const model = require('../models/Transaction')

exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await model.find()

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}
exports.addTransaction = async (req, res, next) => {
    try {
        const {text, amount} = req.body

        const transaction = await model.create(req.body)

        return res.status(201).json({
            success: true,
            data: transaction,
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(value => value.message)

            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: err.message
            })
        }
    }
}
exports.deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await model.findById(req.params.id)

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'User not found !'
            })
        }

        await transaction.remove()

        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}