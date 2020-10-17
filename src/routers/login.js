const express= require('express')
const router = new express.Router()
const User = require('../database/models/user')
const jsonwebtoken = require('jsonwebtoken')
const cookie = require('cookie')

router.post('/login/process', async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.query.username,
            password: req.query.password
        })
        if (user) {
            const token = jsonwebtoken.sign({_id: `${user._id}`}, 'thiscodeisverysecret')
            user.tokens.push({token})
            user.save().then(() => {
                const expires = new Date(Date.now() + 86400*1000*7) //7 days
                res.setHeader('Set-Cookie', [cookie.serialize('username', user.fullname, {path: '/', expires}),cookie.serialize('token', token, {path: '/', expires})])
                res.send({error: false})
            }).catch(() => {res.send({error: 'Cannot generating your token'})})
        }
        else throw new Error('Your username or password is incorrect')
    } catch(e) {
        res.send({error: e.message})
    }
})

module.exports = router