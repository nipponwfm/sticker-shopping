const {Schema, model} = require('mongoose')

const user_item_schema = new Schema({
    user_id: {
        type: String
    },
    item_id: [{
        type: String
    }],
}, {
    timestamps: {}
})

const UserItem = model('user_item', user_item_schema)

module.exports = UserItem