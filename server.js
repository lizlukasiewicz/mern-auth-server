require('dotenv').config()
const express = require('express')
const cors = require('cors')
const rowdy = require('rowdy-logger')
//connect to db
const db = require('./models')
db.connect()

// config express app
const app = express()
const PORT = process.env.PORT || 3001
const rowdyResults = rowdy.begin(app)

// middlewares
app.use(cors())
//body parser middlewares
app.use(express.urlencoded({ extended: false })) 
app.use(express.json())//for the REQUEST BOD --is more secure than query string

//custom middleware
app.use((req, res, next) => {
    //console.log(req)
    console.log(`incoming request:: ${req.method} ${req.url}`)
    res.locals.anything = '🧪'
    next()
})

//controllers
app.use('/api-v1/users', require('./controllers/api-v1/users.js'))

const middleWare = (req, res, next) => {
    console.log('i am a route specific middleware🍭')
    next()
}

app.get('/', middleWare, (req, res) => {
    console.log(res.locals)
    res.json({ msg: 'hello there from ze backend🤸🏻 '})
})

// listen on a port
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`listening on port:: ${PORT} 🪠`)
})