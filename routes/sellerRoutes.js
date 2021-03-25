import express from 'express'
import { createProduct, deleteProduct, updateProduct, packagePayment, createSeller } from '../controllers/seller.js'
import { authCheck, sellerCheck } from '../middleware/auth.js'

const router = express.Router()

router.route('/seller/verify').post(createSeller)
router.route('/product/update')
    .post(authCheck, sellerCheck, updateProduct)
router.route('/product/delete')
    .post(authCheck, sellerCheck, deleteProduct)
router.route('/package/payment')
    .post(packagePayment)

export default router