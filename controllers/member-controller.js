const express = require('express')
const router = express.Router()
require('../config/db.connection')
const {Member} = require('../models')

// user index route
router.get('/', async(req, res)=>{
    try {
        // get all user
        res.json(await Member.find({}))
    } catch(error){
        res.status(400).json(error)
    }
})

// user show route
router.get("/:id", async (req,res)=> {
    try{
        res.json(await Member.findById(req.params.id))
    } catch(error){
        res.status(400).json(error)
    }
})

// user create route
router.post("/", async(req, res)=>{
    try {
        res.json(await Member.create(req.body))
    } catch(error) {
        res.status(400).json(error)
    }
})

// user update route
router.put('/:id', async(req, res)=>{
    try {
        res.json(await Member.findByIdAndUpdate(req.params.id, req.body, {new:true}))
    } catch(error){
        res.status(400).json(error)
    }
})

// user delete route
router.delete('/:id', async(req, res)=>{
    try{
        res.json(await Member.findByIdAndRemove(req.params.id))
    } catch(error){
        res.status(400).json(error)
    }
})


module.exports = router