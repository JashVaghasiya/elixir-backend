import express from 'express'
import { createCity, deleteCity, getCities, getCitiesOfState, getCity, updateCity } from '../controllers/city.js'
import { adminCheck, authCheck } from '../middleware/auth.js'

const router = express.Router()

router.route('/city').post(authCheck, adminCheck, createCity).get(getCities)
router.route('/city/:id')
    .put(authCheck, adminCheck, updateCity)
    .delete(authCheck, adminCheck, deleteCity)
    .get(getCity)
router.route('/city/:id/state')
    .get(getCitiesOfState)



export default router