const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema (
    {
        conversationId: {
            type: String
        },
        sender: {
            type: String
        }, text:{
            type:String
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref:'User',
            required: true
        }
    },
    {timestamps:true}
)

module.exports = mongoose.model('Message', MessageSchema)
