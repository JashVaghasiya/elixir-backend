import * as io from "socket.io"
import createServer from 'http'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

const socketApp = express()

const server = createServer.createServer(socketApp)
socketApp.use(cors())

const socketIO = new io.Server(server, {
    cors: {
        origin: "*"
    }
})
let room
socketIO.on('connection', socket => {

    //adding user to room
    socket.on("addUser", async (sender, receiver) => {
        socket.username = sender
        room = sender + "-room-" + receiver
        socket.join(room)
        console.log(`User joined room: ${room}`);
    })
    //adding doctor to room 
    socket.on("addDoctor", (sender, receiver) => {
        socket.username = receiver
        room = sender + "-room-" + receiver
        socket.join(room)
        console.log(`Doctor joined room: ${room}`);
    })
    //sending chat
    socket.on("sendChat", (message) => {
        createMessage(message)
    })
    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
})

const createMessage = async (message) => {
    let flag = false
    !flag && socketIO.to(room).emit('updateChat', message)
}

server.listen(5001, (req, res) => {
    console.log(`SocketIO is running on PORT: 5001`)
});
