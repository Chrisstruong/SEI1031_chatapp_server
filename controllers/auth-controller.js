const express = require("express")
const router = express.Router()
const {User} = require('../models')
const bcrypt = require('bcrypt')

// SIGN UP
// POST /auth/register
router.post("/register", async (req, res, next) => {
   try{
        // 1. create salt (random seed to make our PW hash unique)
       const salt = await bcrypt.genSalt(10)
        // 2, create
        const passwordHash = await bcrypt.hash(req.body.password, salt)
        req.body.password = passwordHash
        const newUser = await User.create(req.body)
        res.status(200).send({ user : newUser, isLoggedIn:true})

   } catch(err){
    res.status(400).json({err: err.message})
   }
});

// SIGN IN
// POST /auth/login
router.post("/login", async (req, res, next) => {});



module.exports = router