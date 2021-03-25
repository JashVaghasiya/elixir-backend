import express from 'express'
import { adminCheck, authCheck } from '../middleware/auth.js'
import { createCoupon, getCoupons, deleteCoupon, getCoupon, updateCoupon } from '../controllers/coupon.js'

const router = express.Router()

router.route('/coupon').post(authCheck, adminCheck, createCoupon).get(getCoupons)
router.route('/coupon/:id').delete(authCheck, adminCheck, deleteCoupon).get(getCoupon).put(authCheck, adminCheck, updateCoupon)

export default router