import express from 'express'
import { createUser, findUser, getCurrentUser, countData, updateUser, getUserProfile, makeComplain, listComplain, listOrder } from '../controllers/user.js'
import { addToWishlist, getWishlist, removeWishlist } from '../controllers/wishlist.js'
import { addToCart, getCart, removeFromCart, updateCart } from '../controllers/cart.js'
import { authCheck } from '../middleware/auth.js'

const router = express.Router()

router.post('/user/register', authCheck, createUser)
router.post('/user/login', authCheck, findUser)
router.post('/user/update', authCheck, updateUser)
router.get('/user/footer/count', countData)
router.get('/current/user', authCheck, getCurrentUser)
router.get('/user/get/profile/:id', authCheck, getUserProfile)
router.post('/user/cart/add', authCheck, addToCart)
router.put('/user/cart/update', authCheck, updateCart)
router.get('/user/cart/:id', authCheck, getCart)
router.delete('/user/cart/:id', authCheck, removeFromCart)
router.put('/user/wishlist/add', authCheck, addToWishlist)
router.get('/user/wishlist', authCheck, getWishlist)
router.put('/user/wishlist/:id', authCheck, removeWishlist)
router.post('/user/complain', authCheck, makeComplain)
router.get('/user/list/complain/:id', authCheck, listComplain)
router.get('/user/get/order/:id', authCheck, listOrder)

export default router