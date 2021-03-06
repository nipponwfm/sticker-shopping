const express = require('express')
const router = new express.Router()
const Item = require('../database/models/item')

router.get('/stock/process', async (req, res) => {
    try {
        var { page, faction, order, sortBy, sale, search } = req.query
        //filter by faction
        var items = faction ? await Item.find({ faction }) : await Item.find()
        //filter item amount !==0 
        items = items.filter(item => item.amount !== 0)
        //filter by search
        if (search) {
            search = search.toLowerCase()
            items = items.filter((item) => item.name.toLowerCase().search(search)!==-1)
        }
        //filter by sale
        if (sale==='true') items = items.filter((item) => item.sale)
        //filter by order
        if (sortBy) {
            sortBy === 'A-Z' ? sortBy = 1 : sortBy = -1
            switch(order) {
                case 'Popular': {
                    items.sort((a,b) => sortBy*(a.popular-b.popular))
                }
                case 'Price': {
                    items.sort((a,b) => sortBy*(a.price-b.price))
                }
            }
        }
        //return
        let filter = []
        let skip = 9, start = (page - 1) * skip, end = start + skip
        for (var i = start; i < end && items[i]; i++) filter.push(items[i])
        res.send([items.length, ...filter])
    } catch {
        res.send({ error: "Cannot get items" })
    }
})

router.get('/stock/home', async (req, res) => {
    var items = await Item.find();
    switch(req.query.type) {
        case 'popular': {
            items.sort((a,b) => a.popular - b.popular)
        }
        case 'random': {
            items.sort((a,b) => {return 0.5 - Math.random()})
        }
    }
    res.send(items.splice(0, 9))
})

router.get('/stock/relatedItem', async (req, res) => {
    const faction = req.query.faction
    var items = await Item.find({faction})
    items.sort((a,b) => {return 0.5 - Math.random()})
    res.send(items.splice(0, 9))
})

module.exports = router