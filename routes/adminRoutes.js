import express from 'express'
import { deleteProduct } from '../controllers/product.js'
import { getUsers, getSellers, getOrders, deactivateUser, activateUser, getUserCount, getLocationCount, getOtherCount, getOrderCount, getProductCount } from '../controllers/admin.js'
import { authCheck, adminCheck } from '../middleware/auth.js'

const router = express.Router()

router.get('/admin/users', authCheck, adminCheck, getUsers)
router.put('/admin/user/deactivate/:id', authCheck, adminCheck, deactivateUser)
router.put('/admin/user/activate/:id', authCheck, adminCheck, activateUser)
router.get('/admin/seller', authCheck, adminCheck, getSellers)
router.get('/admin/orders', authCheck, adminCheck, getOrders)

router.get('/admin/user/count', authCheck, adminCheck, getUserCount)
router.get('/admin/product/count', authCheck, adminCheck, getProductCount)
router.get('/admin/order/count', authCheck, adminCheck, getOrderCount)
router.get('/admin/location/count', authCheck, adminCheck, getLocationCount)
router.get('/admin/other/count', authCheck, adminCheck, getOtherCount)

export default router

