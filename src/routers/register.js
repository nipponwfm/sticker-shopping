const express = require('express')
const router = new express.Router()
const User = require('../database/models/user')
const {checkError} = require('../utils/formErrorChecker')

router.get('/register/process', async (req, res) => {
    const user = new User({
        username: req.query.username,
        password: req.query.password,
        email: req.query.email,
        fullname: req.query.fullname,
        gender: req.query.gender,
        birthday: req.query.birthday,
        address: req.query.address
    })
    user.save().then(() => {
        res.send({error: false})
    }).catch((e) => {
        res.send({error: checkError(e.message)})
    })
})

module.exports = router