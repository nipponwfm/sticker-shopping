const express = require('express')
const router = new express.Router()
const auth = require('../authorize/authorize')
const path = require('path')

router.get('/cart', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontend/public/index.html'))
})

module.exports = router