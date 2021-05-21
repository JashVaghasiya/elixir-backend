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

    message: {
        type: String,
    },
    name: { type: String },
    roomId: {
        type: String,
    }
}, {
    timestamps: true
})

const Chat = mongoose.model('chat', chatSchema)

export default Chat

// http://psitsmike.com/2011/10/node-js-and-socket-io-multiroom-chat-tutorial/