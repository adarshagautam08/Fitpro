import { Router } from "express";
import {login} from '../controller/loginController'
import { authMiddleware } from "../middleware/authmiddleware";
import { roleMiddleware } from "../middleware/rolemiddleware";
import { createAdmin } from "../controller/createAdminController";
const router  =Router()

router.post('/login',login)

// router.post(
//   "/test-auth",
//   authMiddleware,
//   roleMiddleware(["SUPER_ADMIN"]),
//   (req, res) => {
//     res.json({ message: "Working fine" });
//   }
// );

export default router 