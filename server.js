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
app.use(express.json())//for the REQUEST BOD --is more secure than query string
app.use(express.urlencoded({ extended: false })) 

//controllers
app.use('/api-v1/users', require('./controllers/api-v1/users.js'))

app.get('/', (req, res) => {
    res.json({ msg: 'hello there from ze backend🤸🏻 '})
})

// listen on a port
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`listening on port:: ${PORT} 🪠`)
})