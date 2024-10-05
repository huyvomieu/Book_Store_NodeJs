const mongoose = require('mongoose');
const generate = require('../../helpers/generate')
const Schema = mongoose.Schema;
const User = new Schema(
    {
        fullname: String,
        username: String,
        email: String,
        password: String,
        tokenUser: {
            type: String,
            default: generate.generateStringRandom(30),
        },
        email: String,
        avatar: String,
        phone: Number,
        status: {
            type: String,
            default: "active"
        },
        address: String,
        deleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    });


module.exports = mongoose.model('User', User, 'users')