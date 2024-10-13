const randomstring = require('randomstring');

module.exports.generateStringRandom = (length) => {
    let char = 'abcdefghijklmnopqrstuvywzxABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = "";
    for (let i = 0; i < length; i++) {
        result += char.charAt(Math.floor(Math.random() * char.length))
    }
    return result;
}

module.exports.generateOTP = (length) => {
    let char = '0123456789';
    let result = "";
    for (let i = 0; i < length; i++) {
        result += char.charAt(Math.floor(Math.random() * char.length))
    }
    return result;
}