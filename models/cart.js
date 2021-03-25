import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const cartSchema = mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'user'
    },
    productId: {
        type: ObjectId,
        ref: 'product'
    },
    qty: {
        type: Number
    }
}, { timestamps: true })

const Cart = mongoose.model('cart', cartSchema)

export default Cart