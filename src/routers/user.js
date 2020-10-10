const express = require('express')
const router = new express.Router()
const auth = require('../authorize/authorize')
const path = require('path')

router.get('/user', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontend/public/index.html'))
})

router.get('/user/process', auth, (req, res) => {
    const user = req.user
    res.send([
        user.username, user.password, user.email, user.fullname, user.gender, user.birthday, user.address
    ])
})

module.exports = router