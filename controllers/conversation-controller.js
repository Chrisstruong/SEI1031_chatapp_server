const router = require('express').Router()
const Conversation = require('../models/Conversation')

// new conv
router.post('/', async (req, res)=> {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    })

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation)
    }catch(err){
        res.status(500).json(err)
    }
})
// Show how many conversation each user have.

router.get('/:userId',async (req, res)=>{
    try {
        const conversation = await Conversation.find({
            members: {$in:[req.params.userId]}, 
        })
        // res.status(200).json(conversation)
        res.status(200).json(conversation)
    } catch(err){
        res.status(500).json(err)
    }
})

router.get('/', async (req, res)=> {
    try{
        res.json(await Conversation.find({}))
    } catch(error) {
        res.status(400).json(error)
    }
})

router.get('/detail/:id', async(req, res)=> {
    try{
        res.json(await Conversation.findById(req.params.id))
    } catch(error){
        res.status(400).json(error)
    }
})

router.delete('/delete/:id', async(req, res)=>{
    try{
        res.json(await Conversation.findByIdAndRemove(req.params.id))
    } catch(error){
        res.status(400).json(error)
    }
})


module.exports = router;