const express = require('express')
const router = new express.Router()
const cookie = require('cookie')
const auth = require('../authorize/authorize')

router.get('/logout', auth, (req, res) => {
    const cookies = cookie.parse(req.headers.cookie || '')
    const user = req.user
    
    user.tokens = user.tokens.filter(({token}) => token!==cookies.token)
    user.save()
    res.setHeader('Set-Cookie', [cookie.serialize('token', '', {path: '/'}), cookie.serialize('username', '', {path: '/'})])
    res.redirect('/')
})

module.exports = router