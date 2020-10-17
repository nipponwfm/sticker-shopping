const express = require('express')
const router = new express.Router()
const auth = require('../authorize/authorize')

router.get('/recharge/process', auth, (req, res) => {
    try {
        const money = Number(req.query.money)
        const user = req.user
        user.money += money
        user.save()
        res.redirect('http://localhost:8080/recharge/result?result=true')
    } catch(e) {
        res.redirect('http://localhost:8080/recharge/result?result=false')
    }
})

module.exports = router