const express = require('express')
const router = new express.Router()
const Item = require('../database/models/item')

router.get('/item/process', async (req, res) => {
    const name = req.query.name
    const item = await Item.findOne({name})
    if (item) return res.send(item)
    res.send({error: 'Not found your item'})
})

module.exports = router