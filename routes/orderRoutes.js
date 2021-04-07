import express from 'express'
import { authCheck, adminCheck } from '../middleware/auth.js'
import { getOrders, createOrder, getOrder } from '../controllers/order.js'


const router = express.Router()

router.route('/order/:id').get(authCheck, getOrder)
router.route('/order').post(authCheck, createOrder)
router.route('/orders').get(authCheck, getOrders)


export default router