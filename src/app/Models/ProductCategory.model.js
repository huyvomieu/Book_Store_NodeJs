const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;

// :slug
mongoose.plugin(slug);
const ProductCategory = new Schema(
    {
        name: String,
        parrentId: String,
        description: String,
        image: String,
        deleted: {
            type: Boolean,
            default: false
        },
        createdBy: {
            account_id: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        },
        updatedBy: [
            {
                account_id: String,
                updatedAt: Date,
            }
        ],
        deletedBy: {
            account_id: String,
            deletedAt: Date,
        },
        slug: {
            type: String,
            slug: "name",
            unique: true,
        }
    },
    {
        // timestamps: true
    });

module.exports = mongoose.model('ProductCategory', ProductCategory);