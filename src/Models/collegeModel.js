const mongoose = require('mongoose')

const collegeModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        Unique: true
    },
    fullName: {
        type: String,
        required: true,
        Unique: true
    },
    logoLink: {
        type: String,
        required: true,
        Unique: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true })

module.exports = mongoose.model('College-Model', collegeModel)
