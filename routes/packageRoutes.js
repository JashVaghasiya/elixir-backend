import express from 'express'
import { createPack, deletePack, getPack, getPacks, updatePack } from '../controllers/package.js'

import { authCheck, adminCheck } from '../middleware/auth.js'

const router = express.Router()

router.route('/admin/package/:id').delete(authCheck, adminCheck, deletePack).get(authCheck, adminCheck, getPack).put(authCheck, adminCheck, updatePack)
router.post('/admin/package', authCheck, adminCheck, createPack)
router.get('/package', getPacks)

export default router