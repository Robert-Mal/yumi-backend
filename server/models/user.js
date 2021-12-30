const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: String,
    fullName : String,
    password: String
}, { versionKey: false })

module.exports = mongoose.model('user', userSchema)