import {Router} from "express"
import { authMiddleware } from "../../middleware/authmiddleware"
import { roleMiddleware } from "../../middleware/rolemiddleware"
import {viewAllPlans} from '../member/memberController'
const router=Router()
//view assign plans for the member
router.get('/view-plans',authMiddleware,roleMiddleware(["MEMBER"]),viewAllPlans)

export default router