const express = require("express")
const router = express.Router()
const {User} = require('../models')
const bcrypt = require('bcrypt')

const { createUserToken } = require('../middleware/auth')

// SIGN UP
// POST /auth/register
router.post("/register", async (req, res, next) => {
   try{
        // 1. create salt (random seed to make our PW hash unique)
       const salt = await bcrypt.genSalt(10)
        // 2, create
        const passwordHash = await bcrypt.hash(req.body.password, salt)
        const rawPWStore = req.body.password
        req.body.password = passwordHash
        const newUser = await User.create(req.body)
        if (newUser) {
         req.body.password = rawPWStore
         const authenticatedUserToken = createUserToken(req, newUser)
         res.status(200).send({ user : newUser, isLoggedIn: false, token: authenticatedUserToken})//isLoggedIn can be false depends on your task
        } else {
         res.status(400).json({err: "something went wrong"})
        }

   } catch(err){
    res.status(400).json({err: err.message})
   }
});

// SIGN IN
// POST /auth/login
router.post("/login", async (req, res, next) => {
   try {
     const loggingUser = req.body.username;
     const foundUser = await User.findOne({ username: loggingUser });
     const token = await createUserToken(req, foundUser);
   
     res.status(200).json({
       user: foundUser,
       isLoggedIn: true,
       token,
     });
   } catch (err) {
     res.status(401).json({ error: err.message });
   }
 });
 
 



module.exports = router