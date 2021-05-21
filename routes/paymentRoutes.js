import express from 'express'
import { packagePayment, orderPayment, adsPayment } from '../controllers/payment.js'

import { authCheck } from '../middleware/auth.js'

const router = express.Router()

router.post('/payment/package', packagePayment)
router.post('/payment/cart', authCheck, orderPayment)
router.post('/payment/ads', authCheck, adsPayment)


export default router