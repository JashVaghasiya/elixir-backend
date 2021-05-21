import express from 'express'
import { getTopRated, getCategoryViseProduct, createProduct, deleteProduct, getProduct, getProducts, getUnapprovedProduct, updateProduct, getSellerProduct, activateProduct, approveProduct, rejectProduct, deactivateProduct, getRejectedProducts, getDeactivatedProducts, getActiveProducts, getFilteredProducts, getSearchedProducts, getTopGrossing, getHomeProducts, getSubCategoryViseProduct } from '../controllers/product.js'
import { adminCheck, authCheck, sellerCheck } from '../middleware/auth.js'

const router = express.Router()


//get specific product  
router.get('/product/:id', getProduct)

//get All Products
router.get('/products', getProducts)

router.get('/product/category/:category', getCategoryViseProduct)

router.get('/product/subcategory/:subcategory', getSubCategoryViseProduct)

//create product
router.route('/seller/product')
    .post(authCheck, sellerCheck, createProduct)

//update and delete specific product
router.route('/seller/product/:id')
    .put(authCheck, sellerCheck, updateProduct)
    .delete(authCheck, sellerCheck, deleteProduct)

//get specific seller product
router.route('/seller/product/:id')
    .get(authCheck, sellerCheck, getSellerProduct)


//get active product of seller
router.route('/seller/product/:id/active')
    .get(authCheck, sellerCheck, getActiveProducts)


//get deactivated product of seller
router.route('/seller/product/:id/deactivated')
    .get(authCheck, sellerCheck, getDeactivatedProducts)


//activate product
router.route('/seller/product/activate/:id')
    .put(authCheck, sellerCheck, activateProduct)

//deactivate product
router.route('/seller/product/deactivate/:id')
    .put(authCheck, sellerCheck, deactivateProduct)

//approve product
router.route('/admin/product/approve')
    .get(authCheck, adminCheck, getUnapprovedProduct)

//approve product
router.route('/admin/product/approve/:id')
    .put(authCheck, adminCheck, approveProduct)

//rejected product
router.route('/admin/product/reject/:id')
    .put(authCheck, adminCheck, rejectProduct)

//getting rejected product
router.route('/seller/product/rejected/:id')
    .get(authCheck, sellerCheck, getRejectedProducts)


//home page
router.get('/home/products', getHomeProducts)

router.post('/products/filter', getFilteredProducts)

router.post('/products/search', getSearchedProducts)

router.get('/products/top/rated', getTopRated)

router.get('/products/top/grossing', getTopGrossing)

export default router