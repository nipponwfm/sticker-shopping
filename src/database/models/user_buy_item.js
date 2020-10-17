const {Schema, model} = require('mongoose')

const user_item_schema = new Schema({
    user_id: {
        type: String
    },
    items: [{
        _id: {
            type: String
        },
        amount: {
            type: Number
        }
    }],
}, {
    timestamps: {}
})

const UserItem = model('user_buy_item', user_item_schema)

module.exports = UserItem