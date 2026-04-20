import {Router} from 'express'
import { authMiddleware } from '../../middleware/authmiddleware'
import { roleMiddleware } from '../../middleware/rolemiddleware'
import {createTrainer,createMember} from './adminController'

const router=Router()
//route for creating trainer by admin
router.post('/create-trainer',authMiddleware,roleMiddleware(["ADMIN"]),createTrainer)
router.post('/create-member',authMiddleware,roleMiddleware(["ADMIN"]),createMember)

export default router
