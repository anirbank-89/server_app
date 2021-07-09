const express = require('express')
const router = express.Router()
const Club = require('../models/Club')

// router.get('/', (req,res,next)=>{
//     res.send('Express router is working')
// })
router.get('/',(req,res,next)=>{
    res.render('home')
})
router.post('/add',(req,res,next)=>{
    const name = req.body.name
    const player = req.body.players
    const coach = req.body.coach

    console.log(name, players, coach)
})

module.exports = router