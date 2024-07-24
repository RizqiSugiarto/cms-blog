import { Router } from 'express'
import { AuthService } from '@/service/auth'
import { AuthController } from '@/controller/auth'

const router = Router()
const authService = new AuthService()
const authController = new AuthController(authService)

router.post('/register', (req, res, next) => authController.register(req, res, next))
router.post('/login', (req, res, next) => authController.login(req, res, next))

export default router
