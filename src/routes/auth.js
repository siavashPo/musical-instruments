import express from "express";
import AuthController from '../controllers/auth'
import {validate} from "express-jsonschema";
import {loginSchema, registerSchema} from "../validators/auth";

const router = express.Router()

router.post('/login', validate(loginSchema), AuthController.login.bind(AuthController))
router.post('/register', validate(registerSchema), AuthController.register)
router.get('/logout', AuthController.logout)

export default router