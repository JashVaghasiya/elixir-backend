import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const packageIncomeSchema = mongoose.Schema({
    seller: {
        type: ObjectId,
        ref: 'user'
    },
    packageName: {
        type: String
    },
    duration: {
        type: Number
    },
    products: {
        type: Number
    },
    amountPaid: {
        type: Number,
    }
}, { timestamps: true })

const packageIncome = mongoose.model('packageIncome', packageIncomeSchema)

export default packageIncome