import mongoose from 'mongoose'

const stateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "State name is required",
        trim: true,
    },
    slug: {
        type: String,
        unique: true
    }
}, { timestamps: true })

const State = mongoose.model('state', stateSchema)

export default State