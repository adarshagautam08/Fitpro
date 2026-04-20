import {Router} from 'express'
import { authMiddleware } from '../../middleware/authmiddleware'
import { createAdmin } from './SuperAdminController'
import { roleMiddleware } from '../../middleware/rolemiddleware'
import {createTrainer} from '../admin/adminController'

const router=Router()
//route for creating admin by super-admin
router.post('/create-admin',authMiddleware,roleMiddleware(["SUPER_ADMIN"]),createAdmin)

export default router
