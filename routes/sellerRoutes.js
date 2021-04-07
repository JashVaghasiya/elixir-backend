import express from 'express'
import { packagePayment, createSeller } from '../controllers/seller.js'
import { authCheck, sellerCheck } from '../middleware/auth.js'

const router = express.Router()

router.route('/seller/verify').post(createSeller)
router.route('/package/payment')
    .post(packagePayment)

export default router