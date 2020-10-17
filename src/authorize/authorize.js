const cookie = require('cookie')
const User = require('../database/models/user')

const auth = async (req, res, next) => {
    try {
        const cookies = cookie.parse(req.headers.cookie || '')
        const user = await User.findOne({'tokens.token': cookies.token})
        if (!user) throw new Error('')
        req.user = user
        next()
    } catch(e) {
        res.redirect('/notauthorize')
    }
}

module.exports = auth