import express from 'express'
import { getUsers, deactivateUser, activateUser, getUserCount, getLocationCount, getOtherCount, getOrderCount, getProductCount, getComplains, solveComplain } from '../controllers/admin.js'
import { authCheck, adminCheck } from '../middleware/auth.js'
import { getSellers, getSingleSeller } from '../controllers/seller.js'
import { getOrders } from '../controllers/order.js'
import { getAds } from '../controllers/ads.js'
import { getAgencies } from '../controllers/agency.js'

const router = express.Router()

router.get('/admin/users', authCheck, adminCheck, getUsers)
router.put('/admin/deactivate/:id', authCheck, adminCheck, deactivateUser)
router.put('/admin/activate/:id', authCheck, adminCheck, activateUser)
router.get('/admin/seller', authCheck, adminCheck, getSellers)
router.get('/admin/seller/:id', authCheck, adminCheck, getSingleSeller)
router.get('/admin/orders', authCheck, adminCheck, getOrders)
router.get('/admin/ads', authCheck, adminCheck, getAds)
router.get('/admin/agency', authCheck, adminCheck, getAgencies)
router.get('/admin/complains', authCheck, adminCheck, getComplains)
router.put('/admin/complain/solve', authCheck, adminCheck, solveComplain)

//counters
router.get('/admin/user/count', authCheck, adminCheck, getUserCount)
router.get('/admin/product/count', authCheck, adminCheck, getProductCount)
router.get('/admin/order/count', authCheck, adminCheck, getOrderCount)
router.get('/admin/location/count', authCheck, adminCheck, getLocationCount)
router.get('/admin/other/count', authCheck, adminCheck, getOtherCount)

export default router

