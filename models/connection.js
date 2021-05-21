import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const chatSchema = mongoose.Schema({
    sender: {
        type: ObjectId,
        ref: 'user'
    },
    receiver: {
        type: ObjectId,
        ref: 'user'
    },
    roomId: {
        type: String,
    },
}, {
    timestamps: true
})

const Connection = mongoose.model('connection', chatSchema)

export default Connection

// http://psitsmike.com/2011/10/node-js-and-socket-io-multiroom-chat-tutorial/