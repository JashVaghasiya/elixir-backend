import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const usedCouponSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'user'
    },
    couponId: {
        type: ObjectId,
        ref: "coupon"
    }
}, {
    timestamps: true
})

const UsedCoupon = mongoose.model('usedCoupon', usedCouponSchema)

export default UsedCoupon