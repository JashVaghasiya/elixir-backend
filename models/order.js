import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const orderSchema = mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'user'
    },
    status: {
        type: String,
        default: 'Pending'
    },
    totalQty: {
        type: Number
    },
    taxAmount: {
        type: Number
    },
    shippingCharges: {
        type: Number
    },
    grandTotal: {
        type: Number
    },
    coupon: {
        type: ObjectId,
        ref: 'coupon'
    },
    address: {
        type: String
    },
    discountedAmount: {
        type: Number
    },
    transactionId: {
        type: String
    },
    invoiceURL: {
        type: String
    }
}, { timestamps: true })

const Order = mongoose.model('order', orderSchema)

export default Order