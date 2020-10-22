const express = require('express')
const router = new express.Router()
const User = require('../database/models/user')
const {checkError} = require('../utils/formErrorChecker')

const trimData = value => {
    var _value = value.trim().split(' ')
    return _value.filter(word => word !== '').join(' ')
}

const standardData = (value) => {
    var _value = trimData(value).split(' ')
    var _store = []
    for (var i = 0; i < _value.length; i++) {
        _store.push(_value[i][0].toUpperCase() + _value[i].slice(1, _value[i].length))
    }
    return _store.join(' ')
}

router.post('/register/process', async (req, res) => {
    const user = new User({
        username: req.query.username,
        password: req.query.password,
        email: req.query.email,
        fullname: standardData(req.query.fullname),
        gender: req.query.gender,
        birthday: req.query.birthday,
        address: standardData(req.query.address)
    })
    user.save().then(() => {
        res.send({error: false})
    }).catch((e) => {
        res.send({error: checkError(e.message)})
    })
})

module.exports = router