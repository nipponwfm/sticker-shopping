const {Schema, model} = require('mongoose')

const user_schema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    money: {
        type: Number
    },
    fullname: {
        type: String
    },
    gender: {
        type: Boolean
    },
    birthday: {
        type: Date
    },
    address: {
        type: String
    },
    tokens: [{
        token: {
            type: String
        }
    }]
})

const User = model('users', user_schema)

module.exports = User