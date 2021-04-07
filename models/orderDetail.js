import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const orderSchema = mongoose.Schema({
    orderId: {
        type: ObjectId,
        ref: 'order'
    },
    userId: {
        type: ObjectId,
        ref: 'user'
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

const OrderDetail = mongoose.model('orderDetail', orderSchema)

export default OrderDetail