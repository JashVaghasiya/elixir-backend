import mongoose from 'mongoose'


const { ObjectId } = mongoose.Schema.Types

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    remainingDays: {
        type: Number
    },
    packageId: {
        type: ObjectId,
        ref: 'package'
    },
    wishlist: [{
        type: ObjectId,
        ref: 'product'
    }],
    totalProducts: {
        type: Number
    },
    remainingProducts: {
        type: Number
    },
    activated: {
        type: Boolean,
        default: true
    },
    bankAccNo: {
        type: Number
    },
    mobile: {
        type: Number
    },
    fullName: {
        type: String
    },
    IFSCCode: {
        type: String
    },
}, {
    timestamps: true
})

const User = mongoose.model('user', userSchema)

export default User