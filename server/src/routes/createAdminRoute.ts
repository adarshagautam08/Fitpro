import {Router} from 'express'
import { authMiddleware } from '../middleware/authmiddleware'
import { createAdmin } from '../controller/createAdminController'
import { roleMiddleware } from '../middleware/rolemiddleware'

const router=Router()

router.post('/create-admin',authMiddleware,roleMiddleware(["SUPER_ADMIN"]),createAdmin)
export default router
