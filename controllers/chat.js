import Chat from '../models/chat.js'

export const createNewMessage = async (req, res) => {

    const { userId, doctorId, message } = req.body
    const newMessage = new Chat({
        userId: userId,
        doctorId: doctorId,
        message: message
    })
    newMessage.save()

}


export const getMessages = async (req, res) => {

    let { userId, doctorId } = req.params
    Chat.find({ userId: userId, doctorId: doctorId }).populate('userId doctorId').exec((err, result) => {
        if (err) return console.log(err)
        res.json(result.data)
        console.log(result.data);
    })

}