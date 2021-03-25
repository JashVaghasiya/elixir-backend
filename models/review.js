import mongoose from 'mongoose'

const reviewsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default reviewsSchema