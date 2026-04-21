import {Router} from 'express'
import { authMiddleware } from '../../middleware/authmiddleware'
import { createAdmin,deleteAdmin } from './SuperAdminController'
import { roleMiddleware } from '../../middleware/rolemiddleware'


const router=Router()

router.post('/create-admin',authMiddleware,roleMiddleware(["SUPER_ADMIN"]),createAdmin)
router.delete('/deleteAdmin/:id',authMiddleware,roleMiddleware(["SUPER_ADMIN"]),deleteAdmin)

export default router
