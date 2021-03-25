import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const citySchema = new mongoose.Schema({
    state: {
        type: ObjectId,
        ref: 'state'
    },
    city: {
        type: String
    },
    slug: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
})

const City = mongoose.model('city', citySchema)

export default City