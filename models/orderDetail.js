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
    sellerId: {
        type: ObjectId,
        ref: 'user'
    },
    totalQty: {
        type: Number
    },
    totalAmount: {
        type: Number
    },
    productId: {
        type: ObjectId,
        ref: 'product'
    },
    pickUpDate: {
        type: Date,
        default: null
    },
    picked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const OrderDetail = mongoose.model('orderDetail', orderSchema)

export default OrderDetail