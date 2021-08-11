const express = require('express')
const router = express.Router()
const Club = require('../models/Club')

// router.get('/', (req,res,next)=>{
//     res.send('Express router is working')
// })
// router.get('/',(req,res,next)=>{
//     res.render('home')
// })

// Dynamically render a view with contents from database table
router.get('/',(req,res,next)=>{
    Club.find((err,docs)=>{
        res.render('home', {clubs: docs})   // the 'docs' is coming from the database-table name
                                            // set in index.js
    }).catch(err=>{
        console.log()
    })
})

router.post('/add',(req,res,next)=>{
    // const name = req.body.name
    // const players = req.body.players
    // const coach = req.body.coach

    // Writing the abpve three lines in short
    const {name, players, coach} = req.body

    console.log(name, players, coach)

    const uclClub = new Club({
            name: name,
            players: players,
            coach: coach
    })
    uclClub.save((err)=>{
        if (err) {
            console.log('Didnt receive data. Could not save in database')
        }
        else {
            console.log('Data has been recrded successfully')
            res.redirect('/')
        }
    })
})

// ROUTE TO SHOW UPDATE ELEMENTS
router.get('/edit/:id', (req,res,next)=>{
    console.log(req.params.id)
    Club.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, (err,docs)=>{
        if (err) {
            console.log("Can't retrieve and edit data because of some database problem.")
            next(err)
        }
        else {
            res.render('edit', {club: docs})
        }
    })
})

// ROUTE TO UPDATE ELEMENT
router.post('/edit/:id', (req,res,next)=>{
    Club.findOneAndUpdate({_id: req.params.id}, req.body, (err, docs)=>{
        if (err) {
            console.log('Something went wrong while updating data')
            next(err)
        }
        else {
            console.log('Updated successfully!')
            res.redirect('/')
        }
    })
})

// ROUTE TO DELETE ITEM
router.get('/delete/:id', (req,res,next)=>{
    Club.findByIdAndDelete({_id: req.params.id}, (err,docs)=>{
        if (err) {
            console.log('Could not delete data. Something went wrong.')
            next(err)
        }
        else {
            console.log('Deleted successfully!')
            res.redirect('/')
        }
    })
})

module.exports = router