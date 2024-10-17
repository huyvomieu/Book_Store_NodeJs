const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SettingGenerate = new Schema(
    {
        websitename: String,
        email: String,
        email: String,
        avatar: String,
        phone: String,
        address: String,

    },
    {
        timestamps: true
    });


module.exports = mongoose.model('SettingGenerate', SettingGenerate, 'setting-generate')