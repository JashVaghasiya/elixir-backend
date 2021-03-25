import mongoose from 'mongoose'

const agencySchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
    },
    mobile: {
        type: Number,
        maxlength: [10, 'Too Long']
    }
}, {
    timestamps: true
})

const Agency = mongoose.model('agency', agencySchema)

export default Agency