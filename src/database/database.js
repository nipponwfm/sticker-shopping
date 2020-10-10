const mongoose = require('mongoose')

// module.exports = async () => {
//     await 
mongoose.connect(process.env.dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (e) => {
    if (!e) return console.log("Database connected")
    console.log("Failed to connect to database")
})