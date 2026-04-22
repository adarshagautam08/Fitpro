import {Router} from 'express'
import { authMiddleware } from '../../middleware/authmiddleware'
import { roleMiddleware } from '../../middleware/rolemiddleware'
import {createTrainer,createMember,assignPlan,getAllUsers,deleteUserById,getUserById,createSubPlan,getAllPlan} from './adminController'

const router=Router()
//route for creating/getting/deleting trainer and member  by admin
router.post('/create-trainer',authMiddleware,roleMiddleware(["ADMIN"]),createTrainer)
router.post('/create-member',authMiddleware,roleMiddleware(["ADMIN"]),createMember)
router.get('/users',authMiddleware,roleMiddleware(["ADMIN"]),getAllUsers)
router.get('/getuser/:id',authMiddleware,roleMiddleware(["ADMIN"]),getUserById)
router.delete('/deleteUser/:id',authMiddleware,roleMiddleware(["ADMIN"]),deleteUserById)
//route for creating/getting/deleting subscription plan by admin 
router.post('/create-subscriptionPlan',authMiddleware,roleMiddleware(["ADMIN"]),createSubPlan)
router.get('/allPlans',authMiddleware,roleMiddleware(["ADMIN"]),getAllPlan)
//assign the subscription to the member 
router.post('/assignPlan',authMiddleware,roleMiddleware(["ADMIN"]),assignPlan)

export default router
