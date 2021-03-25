import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const subSchema = new mongoose.Schema({
    category: {
        type: ObjectId,
        ref: 'category'
    },
    name: {
        type: String
    },
    slug: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
})

const Sub = mongoose.model('sub', subSchema)

export default Sub