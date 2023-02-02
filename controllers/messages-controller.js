const router = require('express').Router()
const Message = require('../models/Message')

const {handleValidateOwnership, requireToken} = require('../middleware/auth')

// add
router.post("/", requireToken,async(req, res)=> {
    const newMessage = new Message(req.body)
    try {
        const owner = req.user._id
        req.body.owner = owner
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    }catch (err){
        res.status(500).json(err)
    }
})

router.get("/:conversationId", async(req, res)=>{
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        })
        res.status(200).json(messages)
    }catch (err){
        res.status(500).json(err)
    }
})

router.get('/', async(req, res)=>{
    try{
        res.json(await Message.find({}).populate('owner', 'username -_id').exec())
    } catch(error){
        res.status(400).json(error)
    }
})

router.get('/detail/:id', async(req, res)=>{
    try {
        res.json(await Message.findById(req.params.id).populate("owner").exec())
    } catch (error){
        res.status(400).json(error)
    }
})

router.put('/detail/:id', requireToken, async(req, res)=> {
    try{
        const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(200).json(updatedMessage)
    } catch(err) {
        res.status(400).json(err)
    }
})

router.delete('/detail/:id', requireToken, async(req, res)=> {
    try{
        res.json(await Message.findByIdAndRemove(req.params.id))
    } catch(err){
        res.status(400).json(err)
    }
})















// delete route (This is special because you need to find a way to delete Object Id)
// router.delete('/:conversationId', async(req, res)=> {
//     try{
//         const deletedMessage = await Message.findOneAndDelete({conversationId: req.params.conversationId})
//         res.status(200).json({message: "yes"})
//     }catch (err){
//         res.status(400).json({error: err});
//     }
// })

module.exports = router;