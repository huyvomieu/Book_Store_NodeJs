const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Order = new Schema(
    {
        userInfo: {
            name: String,
            email: String,
            phone: String,
            address: String,
        },
        products: [
            {
                productId: String,
                price: String,
                quantity: Number,
            }
        ],
        status: {
            type: String,
            default: "initial"
        },
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true
    });


module.exports = mongoose.model('Order', Order, 'orders')