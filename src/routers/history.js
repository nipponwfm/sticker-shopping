const express = require('express')
const router = new express.Router()
const auth = require('../authorize/authorize')
const user_buy_item = require('../database/models/user_buy_item')
const Item = require('../database/models/item')

router.get('/history', auth, async (req, res) => {
    const user = req.user
    const historys = await user_buy_item.find({user_id: user._id})
    let data = []
    for (history of historys) {
        for (item of history.items) {
            const _item = await Item.findOne({_id: item._id})
            if (_item) data.push({name: _item.name, amount: item.amount, price: _item.price, date: history.createdAt})
        }
    }
    res.send(data)
})

module.exports = router