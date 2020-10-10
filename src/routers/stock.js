const express = require('express')
const router = new express.Router()
const Item = require('../database/models/item')

router.get('/stock/maxpage', async (req, res) => {
    const item = await Item.find()
    res.send({max : item.length})
})

router.get('/stock/process', async (req, res) => {
    try {
        let skip = 9, page =req.query.page
        let start = (page - 1) * skip, end = start + skip
        const item = await Item.find()
        let filter = []
        for (var i = start; i < end; i++) filter.push(item[i])
        res.send(filter)
    } catch {
        res.send({error: "Cannot get items"})
    }
})

module.exports = router