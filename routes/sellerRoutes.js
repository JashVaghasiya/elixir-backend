import express from 'express'
import { packagePayment, createSeller, getDashboardData, getSellerProfile, updateSellerProfile, updateSellerPackage } from '../controllers/seller.js'
import { authCheck, sellerCheck } from '../middleware/auth.js'


const router = express.Router()

router.post('/seller/verify', authCheck, createSeller)
router.route('/package/payment')
    .post(packagePayment)
router.route('/seller/dashboard/:id')
    .get(getDashboardData)
router.route('/seller/:id')
    .get(authCheck, getSellerProfile)
router.route('/seller/update/profile/:id')
    .put(authCheck, updateSellerProfile)
router.route('/seller/renew')
    .put(authCheck, updateSellerPackage)


export default router