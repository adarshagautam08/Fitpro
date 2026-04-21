import {Router} from 'express'
import { authMiddleware } from '../../middleware/authmiddleware'
import { roleMiddleware } from '../../middleware/rolemiddleware'
import {createTrainer,createMember,getAllUsers,deleteUserById,getUserById} from './adminController'

const router=Router()
//route for creating trainer by admin
router.post('/create-trainer',authMiddleware,roleMiddleware(["ADMIN"]),createTrainer)
router.post('/create-member',authMiddleware,roleMiddleware(["ADMIN"]),createMember)
router.get('/users',authMiddleware,roleMiddleware(["ADMIN"]),getAllUsers)
router.get('/getuser/:id',authMiddleware,roleMiddleware(["ADMIN"]),getUserById)
router.delete('/deleteUser/:id',authMiddleware,roleMiddleware(["ADMIN"]),deleteUserById)


export default router
