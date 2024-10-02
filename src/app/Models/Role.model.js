const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Roles = new Schema(
    {
        name: String,
        description: String,
        permissions: {
            type: Array,
            default: [],
        },
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date
    },
    {
        timestamps: true
    });


module.exports = mongoose.model('Role', Roles, 'roles')