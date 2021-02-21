const mongoose = require('mongoose')

const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.BASE_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })

        console.log(`Connected to MongoDB : ${conn.connection.host}`.cyan.underline.bold)
    } catch (err) {
        console.log(`Error : ${err.message}`.red.bold)
        process.exit(1)
    }
}

module.exports = connectDatabase