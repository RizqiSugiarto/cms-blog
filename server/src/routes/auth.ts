import { Router } from 'express'
import { AuthService } from '@/service/auth'
import { AuthController } from '@/controller/auth'

const router = Router()
const authService = new AuthService()
const authController = new AuthController(authService)

router.post('/register', (req, res) => authController.register(req, res))
router.post('/login', (req, res) => authController.login(req, res))
router.post('/logout', (req, res) => authController.logout(req, res))

export default router
