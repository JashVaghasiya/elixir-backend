import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const packageSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    previousPrice: {
        type: Number,
        default: null
    },
    duration: {
        type: Number,
        default: 30
    },
    ads: {
        type: Boolean,
        default: false
    },
    adsRate: {
        type: Number,
        default: 10
    },
    products: {
        type: Number,
        default: 15
    }
}, {
    timestamps: true
})

const Package = mongoose.model('package', packageSchema)

export default Package