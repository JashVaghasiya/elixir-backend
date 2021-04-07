import express from 'express'
import { authCheck, adminCheck, agencyCheck } from '../middleware/auth.js'
import { createAgency, getAgency, updateAgency, manageAgency, deleteAgency } from '../controllers/agency.js'


const router = express.Router()

router.post('/admin/agency', authCheck, agencyCheck, createAgency)
router.route('/admin/agency/:id').get(authCheck, agencyCheck, getAgency).delete(authCheck, adminCheck, deleteAgency).put(authCheck, agencyCheck, updateAgency)
router.put('/admin/agency/manage/:id', authCheck, adminCheck, manageAgency)