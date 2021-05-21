import express from 'express'
import { adminCheck, agencyCheck, authCheck, sellerCheck } from '../middleware/auth.js'
import { changeStatus, getOrders, createOrder, getInvoiceOrder, getOrder, getSellerOrders, getDetailOfOrder, getDetailedOrder, getUnScheduledOrders, setPickUp, setPicked, getDetailOrder } from '../controllers/order.js'

const router = express.Router()

router.route('/order/:id').get(authCheck, getOrder)
router.route('/user/get/detail/order/:id').get(authCheck, getDetailOrder)
router.route('/seller/order/:id').put(authCheck, sellerCheck, setPickUp)
router.route('/seller/order/:id').get(authCheck, sellerCheck, getSellerOrders)
router.route('/seller/order/unscheduled/:id').get(authCheck, sellerCheck, getUnScheduledOrders)
router.route('/order').post(authCheck, createOrder)
router.route('/orders').get(authCheck, adminCheck, getOrders)
router.route('/order/:id/invoice').get(authCheck, getInvoiceOrder)

router.put('/agency/order/:id', authCheck, agencyCheck, changeStatus)
router.get('/agency/order', authCheck, agencyCheck, getOrders)
router.get('/agency/order/detail', authCheck, agencyCheck, getDetailedOrder)
router.get('/agency/order/detail/:id', authCheck, agencyCheck, getDetailOfOrder)
router.put('/agency/order/picked/:id', authCheck, agencyCheck, setPicked)

export default router