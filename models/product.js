import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

export const productSchema = mongoose.Schema({
    seller: {
        type: ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    type: {
        type: String
    },
    images: {
        type: Array
    },
    brand: {
        type: String
    },
    category: {
        type: ObjectId,
        ref: 'category'
    },
    subs: [{
        type: ObjectId,
        ref: 'sub'
    }],
    price: {
        type: Number
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0

    },
    form: {
        type: String
    },
    qtyPerPack: {
        type: String
    },
    approved: {
        type: Boolean,
        default: false
    },
    activated: {
        type: Boolean,
        default: false
    },
    rejected: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Product = mongoose.model('product', productSchema)

export default Product