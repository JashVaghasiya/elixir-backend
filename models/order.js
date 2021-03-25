import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const orderSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        ref: 'product'
    },
    customerId: {
        type: ObjectId,
        ref: 'customer'
    },
    status: {
        type: String
    },
    grandTotal: {
        type: Number
    },
    coupon: {
        type: ObjectId,
        ref: 'coupon'
    },
    discountedAmount: {
        type: Number
    }
}, { timestamps: true })

const Order = mongoose.model('order', orderSchema)

export default Order