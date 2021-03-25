import express from 'express'
import { adminCheck, authCheck } from '../middleware/auth.js'
import { createSub, deleteSub, getSub, getSubs, getSubsOfCategory, updateSub } from '../controllers/sub.js'

const router = express.Router()

router.route('/sub').post(authCheck, adminCheck, createSub).get(getSubs)

router.route('/sub/:id')
    .get(authCheck, adminCheck, getSub)
    .delete(authCheck, adminCheck, deleteSub)
    .put(authCheck, adminCheck, updateSub)
router.get('/sub/:id/category', getSubsOfCategory)

export default router