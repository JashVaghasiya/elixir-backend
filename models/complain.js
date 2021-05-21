import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const complainSchema = mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'user'
    },
    orderId: {
        type: ObjectId,
        ref: 'order'
    },
    productName: {
        type: String,
    },
    complain: {
        type: String,
    },
    solved: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Complain = mongoose.model('complain', complainSchema)

export default Complain
