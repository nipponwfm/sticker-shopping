const express = require('express')
const router = new express.Router()
const auth = require('../authorize/authorize')
const path = require('path')

const Item = require('../database/models/item')
const user_buy_item = require('../database/models/user_buy_item')

router.get('/cart', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
})

router.get('/cart/buy', auth, async (req, res) => {
    const cart = JSON.parse(req.query.items)
    let summary = 0;
    cart.forEach(item => {
        summary += item.price * item.amount
    })
    summary /= 10000
    const user = req.user
    //http://localhost:8080
    if (user.money < summary) res.redirect('/payment?result=false')
    else {
        let items = []
        for (item of cart) {
            const {amount, name} = item
            var __item = await Item.findOne({name})
            if (__item) {
                __item.popular += amount
                __item.amount -= amount
                items.push({_id: __item._id, amount})
                __item.save()
            }
        }
        user.money -= summary
        user_buy_item.create({
            user_id: user._id,
            items
        })
        user.save()
        //http://localhost:8080
        res.redirect('/payment?result=true')
    }
})

module.exports = router