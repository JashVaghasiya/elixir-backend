import express from 'express'
import { adminCheck, authCheck } from '../middleware/auth.js'
import { createCoupon, getCoupons, deleteCoupon, getCoupon, updateCoupon, applyCoupon } from '../controllers/coupon.js'

const router = express.Router()

router.route('/coupon').post(authCheck, adminCheck, createCoupon).get(getCoupons)
router.route('/coupon/:id').delete(authCheck, adminCheck, deleteCoupon).put(authCheck, adminCheck, updateCoupon)
router.route('/coupon/:name').get(getCoupon)
router.route('/coupon/apply').post(authCheck, applyCoupon)
export default router