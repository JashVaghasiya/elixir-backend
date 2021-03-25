import express from 'express'
import { createState, deleteState, getState, getStates, updateState } from '../controllers/state.js'
import { adminCheck, authCheck } from '../middleware/auth.js'

const router = express.Router()

router.route('/state').post(authCheck, adminCheck, createState).get(getStates)
router.route('/state/:id')
    .put(authCheck, adminCheck, updateState)
    .delete(authCheck, adminCheck, deleteState)
    .get(getState)


export default router