const mongoose = require('mongoose')

// module.exports = async () => {
//     await 
mongoose.connect('mongodb://127.0.0.1:27017/shopping-website', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (e) => {
    if (!e) return console.log("Database connected")
    console.log("Failed to connect to database")
})