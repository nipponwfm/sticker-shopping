const express = require('express')
const path = require('path')
require('./database/database')

const loginRouter = require('./routers/login')
const registerRouter = require('./routers/register')
const logoutRouter = require('./routers/logout')
const cartRouter = require('./routers/cart')
const userRouter = require('./routers/user')
const stockRouter = require('./routers/stock')
const itemRouter = require('./routers/item')

const app = express()

const publicPath = path.join(__dirname, '../public') //'../../frontend/public'
app.use(express.static(publicPath))

//run local
if (!process.env.PORT) {
    const bodyParser = require('body-parser')
    app.use(bodyParser.json())
}

app.use(loginRouter)
app.use(registerRouter)
app.use(logoutRouter)
app.use(cartRouter)
app.use(userRouter)
app.use(itemRouter)
app.use(stockRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server is up at port', port)
})