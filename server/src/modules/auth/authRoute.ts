import { Router } from "express";
import {login,refreshToken} from './authController'
import {authLimiter} from '../../middleware/rateLimiter'
const router =Router()
router.post('/login',authLimiter,login)
router.post('/refreshToken',authLimiter,refreshToken)
export default router 