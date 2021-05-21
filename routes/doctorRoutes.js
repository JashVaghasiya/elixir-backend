import express from 'express'
import { createDoctor, getAdminDoctors, manageDoctors, getDoctorProfile, updateDoctorProfile, updateProfilePicture } from '../controllers/doctor.js'
import { adminCheck, authCheck } from '../middleware/auth.js'

const router = express.Router()

router.post('/doctor/register', authCheck, createDoctor)
router.get('/admin/doctor/', authCheck, adminCheck, getAdminDoctors)
router.put('/admin/doctor/manage', authCheck, adminCheck, manageDoctors)
router.get('/doctor/profile/:id', authCheck, getDoctorProfile)
router.put('/doctor/update/profile/:id', authCheck, updateDoctorProfile)
router.put('/doctor/update/picture', authCheck, updateProfilePicture)

export default router