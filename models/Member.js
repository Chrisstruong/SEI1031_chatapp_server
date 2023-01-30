const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
    username: String,
    avatarImage: String,
}, {timestamps: true})

const Member = mongoose.model('Member', MemberSchema)
module.exports = Member