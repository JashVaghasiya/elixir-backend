import express from 'express'
import { createNewMessage, getMessages } from '../controllers/chat.js'
const router = express.Router()
router.route('/chat').post(createNewMessage)
router.route('/chat/:userId/:doctorId').get(getMessages)

export default router