const mongoose = require('mongoose');
const generate = require('../../helpers/generate')
const Schema = mongoose.Schema;
const Account = new Schema(
    {
        username: String,
        password: String,
        role_id: String,
        token: {
            type: String,
            default: generate.generateStringRandom(30),
        },
        email: String,
        avatar: String,
        phone: Number,
        status: String,
        address: String,
        deleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    });


module.exports = mongoose.model('Account', Account)