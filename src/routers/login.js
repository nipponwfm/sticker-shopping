const express= require('express')
const router = new express.Router()
const User = require('../database/models/user')
const jsonwebtoken = require('jsonwebtoken')
const cookie = require('cookie')

router.get('/login/process', async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.query.username,
            password: req.query.password
        })
        if (user) {
            const token = jsonwebtoken.sign({_id: `${user._id}`}, 'thiscodeisverysecret')
            user.tokens.push({token})
            user.save().then(() => {
                res.setHeader('Set-Cookie', [cookie.serialize('username', user.fullname, {path: '/'}), cookie.serialize('token', token, {path: '/'})])
                res.send({error: false})
            }).catch(() => {throw new Error('Error: Cannot generating your token')})
        }
        else throw new Error('Your username or password is incorrect')
    } catch(e) {
        res.send({error: e.message})
    }
})

module.exports = router