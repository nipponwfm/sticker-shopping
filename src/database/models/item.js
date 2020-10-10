const {Schema, model} = require('mongoose')

const item_schema = new Schema({
    name: {
        type: String
    },
    faction: {
        type: String
    },
    amount: {
        type: Number
    },
    popular: {
        type: Number
    },
    price: {
        type: Number
    },
    sale: {
        type: Boolean
    },
    url: {
        type: String
    }
})

const Item = model('items', item_schema)

module.exports = Item