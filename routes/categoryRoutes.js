import express from 'express'
import { adminCheck, authCheck } from '../middleware/auth.js'
import { createCategory, updateCategory, deleteCategory, getCategories, getCategory } from '../controllers/category.js'

const router = express.Router()

router.route('/category').post(authCheck, adminCheck, createCategory).get(getCategories)

router.route('/category/:id').get(authCheck, adminCheck, getCategory).delete(authCheck, adminCheck, deleteCategory).put(authCheck, adminCheck, updateCategory)


export default router