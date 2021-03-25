import express from 'express'
import { getProducts } from '../controllers/customer.js'
import { authCheck } from '../middleware/auth.js'

const router = express.Router()

router.route('/customer-products')
    .get(getProducts)

export default router