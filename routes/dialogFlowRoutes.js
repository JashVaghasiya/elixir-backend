import express from 'express'
import { eventQuery, textQuery } from '../controllers/dialogFlow.js'

const router = express.Router()

router.post('/dialogFlow/text', textQuery)

router.post('/dialogFlow/event', eventQuery)

export default router