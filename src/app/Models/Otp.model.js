const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Otp = new Schema(
    {
        email: { type: String, required: true },
        otp: { type: String, required: true },
        expireAt: {
            type: Date,
            expires: 100,
        }
    },
    {
        timestamps: true,
    });


module.exports = mongoose.model('Otp', Otp, 'otps')