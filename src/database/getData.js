const Item = require('./models/item')
const loadDatabase = require('./database')
const fs = require('fs')
const path = require('path')

const getData = async () => {
    await loadDatabase()
    const storage = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/src/data/url.json')).toString())
    console.log('Storage GET!')
    console.log('Adding items...')
    let failedAddItem = []
    const storageLength = storage.length
    for (var i = 0; i < storageLength; i++) {
        let item = await Item.findOne({name: storage[i].ship});
        if (!item) {
            let item = new Item
            item.name = storage[i].ship
            item.faction = storage[i].faction
            item.amount = Math.floor(Math.random() * 10 + 1) * 10
            item.popular = 0
            item.price = Math.floor(Math.random() * 10 + 1) * 5000
            item.sale = Math.floor(Math.random() * 100) ? false : true
            item.url = storage[i].url
            await item.save().then(() => {
                console.log('ADDED: ',storage[i].ship)
            }).catch(() => {
                failedAddItem.push(storage[i].ship)
            })
        }
    }
    console.log('Failed Add Items:\n', failedAddItem)
}

getData()