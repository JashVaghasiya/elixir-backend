import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const couponSchema = new mongoose.Schema({
    name: {
        type: String
    },
    discount: {
        type: Number
    },
    expiresAt: {
        type: Number
    }
}, {
    timestamps: true
})

const Coupon = mongoose.model('coupon', couponSchema)

export default Coupon