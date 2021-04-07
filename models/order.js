import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const orderSchema = mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'user'
    },
    status: {
        type: String
    },
    qty: {
        type: Number
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