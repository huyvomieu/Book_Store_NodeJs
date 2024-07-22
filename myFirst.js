const http = require('http');
const url = require('url');
const fs = require('fs');
const dt = require('./myfirstmodule')
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'autufb4@gmail.com',
        pass: 'autufb4:))'
    }
});

var mailOptions = {
    from: 'autufb4@gmail.com',
    to: 'huy040424@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});