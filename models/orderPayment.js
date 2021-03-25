import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const orderPaymentSchema = mongoose.Schema({
    orderId: {
        type: ObjectId,
        ref: 'order'
    },
    isPaid: {
        type: Boolean
    },
    paymentType: {
        type: String
    },
    transactionId: {
        type: String
    }
}, { timestamps: true })

const Order = mongoose.model('orderPayment', orderPaymentSchema)

export default Order