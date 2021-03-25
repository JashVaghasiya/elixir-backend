import express from 'express'
import { deleteProduct } from '../controllers/product.js'
import { getUsers, getSellers, getOrders, deactivateUser, activateUser } from '../controllers/admin.js'
import { authCheck, adminCheck, sellerCheck } from '../middleware/auth.js'

const router = express.Router()

router.get('/admin/users', authCheck, adminCheck, getUsers)
router.put('/admin/user/deactivate/:id', authCheck, adminCheck, deactivateUser)
router.put('/admin/user/activate/:id', authCheck, adminCheck, activateUser)
router.get('/admin/seller', authCheck, adminCheck, getSellers)
router.get('/admin/orders', authCheck, adminCheck, getOrders)

export default router

