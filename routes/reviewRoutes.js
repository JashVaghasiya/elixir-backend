import express from 'express'
import { getReview } from '../controllers/product.js'
import { createReview } from '../controllers/review.js'
import { authCheck, } from '../middleware/auth.js'

const router = express.Router()

router.post('/user/review', authCheck, createReview)
//get review of particular product
router.get('/product/review/:id', getReview)


export default router