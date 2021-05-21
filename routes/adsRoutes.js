import express from 'express'
import { createAd, getSellerAds, updateAdRate, checkForAds, getAdsProducts, getSingleProduct } from '../controllers/ads.js'
import { adminCheck, authCheck, sellerCheck } from '../middleware/auth.js'

const router = express.Router()

router.route('/seller/ads')
    .post(authCheck, sellerCheck, createAd)
router.route('/seller/check/ads')
    .post(authCheck, sellerCheck, checkForAds)
router.route('/admin/ads').put(authCheck, adminCheck, updateAdRate)
router.route('/seller/ads/:id').get(authCheck, sellerCheck, getSellerAds)
router.get('/ads/product/:id', getSingleProduct)
router.get('/products/top/ads', getAdsProducts)

export default router