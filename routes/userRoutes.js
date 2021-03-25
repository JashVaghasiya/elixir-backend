import express from 'express'
import { createUser, findUser, getCurrentUser, addToCart, addToWishlist, getWishlist, getCart } from '../controllers/user.js'
import { authCheck } from '../middleware/auth.js'

const router = express.Router()

router.post('/user/register', authCheck, createUser)
router.post('/user/login', authCheck, findUser)
router.post('/current-user', authCheck, getCurrentUser)
router.put('/user/cart/add', authCheck, addToCart)
router.get('/user/cart/:id', authCheck, getCart)
router.put('/user/wishlist/add', authCheck, addToWishlist)
router.get('/user/wishlist', authCheck, getWishlist)

// router.get('/user/cart', authCheck, getCart)

export default router