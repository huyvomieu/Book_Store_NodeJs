const mongoose = require('mongoose');
async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://nguyen040424:O3SB9faYt7f4czzj@project1.hdlrq.mongodb.net/bansach');
        console.log("connect successfully")
    } catch (error) {
        console.log("connect fail")
    }
}

module.exports = { connectDB }

