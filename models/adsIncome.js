import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const adsIncomeSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        ref: 'product'
    },
    seller: {
        type: ObjectId,
        ref: 'user'
    },
    amountPaid: {
        type: Number,
    },
    paidAt: {
        type: Date
    },
    expireAfter: {
        type: Number
    },
    transactionId: {
        type: String
    }
}, { timestamps: true })

const adsIncome = mongoose.model('adsIncome', adsIncomeSchema)

export default adsIncome