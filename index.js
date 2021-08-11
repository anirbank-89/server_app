const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const homeRoute = require('./routes/home')
const Club = require('./models/Club')


const app = express()
mongoose.connect('mongodb://localhost:27017/first_mongo_table', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection
db.on('error', ()=>{
    console.log('Could not connect to database. Something went wrong.')
})
db.once('open', ()=>{
    console.log('Connected successfully to database!')
})

const port = 8000

app.use('/',homeRoute)

// MIDDLEWARE SETUP
//VIEW ENGINE SETUP
app.set('view engine','ejs')
// STATIC FOLDER SETUP
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 // parse application/json
app.use(bodyParser.json())

app.listen(port, ()=>{
    console.log(`App listening at port ${port}`)
})