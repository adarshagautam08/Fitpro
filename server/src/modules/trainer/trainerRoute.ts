import { Router } from "express";
import { authMiddleware } from "../../middleware/authmiddleware";
import { roleMiddleware } from "../../middleware/rolemiddleware";
import {createWorkout,getAllPlan,assignWorkout,addAvailability} from "../trainer/trainerController"

const router=Router();
router.post('/create-workoutPlans',authMiddleware,roleMiddleware(["TRAINER"]),createWorkout)
//get the workout plans made by the member 
router.get('/getWorkoutPlans',authMiddleware,roleMiddleware(["TRAINER"]),getAllPlan)
//assigning the workout plan by the trainer to member 
router.post('/assignWorkoutMember',authMiddleware,roleMiddleware(["TRAINER"]),assignWorkout)
//trainer set avaibility 
router.post('/availability',authMiddleware,roleMiddleware(["TRAINER"]),addAvailability)
export default router