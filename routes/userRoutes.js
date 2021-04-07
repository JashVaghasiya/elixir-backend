import express from 'express'
import { createUser, findUser, getCurrentUser } from '../controllers/user.js'
import { addToWishlist, getWishlist, removeWishlist } from '../controllers/wishlist.js'
import { addToCart, getCart, removeFromCart, updateCart } from '../controllers/cart.js'
import { authCheck } from '../middleware/auth.js'

const router = express.Router()

router.post('/user/register', authCheck, createUser)
router.post('/user/login', authCheck, findUser)
router.post('/current-user', authCheck, getCurrentUser)
router.post('/user/cart/add', authCheck, addToCart)
router.put('/user/cart/update', authCheck, updateCart)
router.get('/user/cart/:id', authCheck, getCart)
router.delete('/user/cart/:id', authCheck, removeFromCart)
router.put('/user/wishlist/add', authCheck, addToWishlist)
router.get('/user/wishlist', authCheck, getWishlist)
router.put('/user/wishlist/:id', authCheck, removeWishlist)

// router.get('/user/cart', authCheck, getCart)

export default router