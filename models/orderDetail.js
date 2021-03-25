import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const orderSchema = mongoose.Schema({
    orderId: {
        type: ObjectId,
        ref: 'order'
    },
    qty: {
        type: Number
    },
    totalAmount: {
        type: Number
    },
    productId: {
        type: ObjectId,
        ref: 'product'
    }
}, { timestamps: true })

const Order = mongoose.model('order', orderSchema)

export default Order