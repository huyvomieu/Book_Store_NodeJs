const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cart = new Schema(
    {
        name: String,
        customer_id: String,
        description: String,
        products: {
            type: Array,
            default: [],
        },
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true
    });


module.exports = mongoose.model('Cart', Cart, 'carts')