import { Request, Response } from 'express'
import { RegisterDto, LoginDto } from '@/dto/auth'
import { AuthService } from '@/service/auth'

export class AuthController {
    private authService: AuthService

    constructor(authService: AuthService) {
        this.authService = authService
    }

    async register(req: Request, res: Response): Promise<void> {
        try {
            const registerData: RegisterDto = req.body
            const newUser = await this.authService.registerUser(registerData)
            res.status(201).json(newUser)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const loginData: LoginDto = req.body
            const isAccountExist = this.authService.findUserByEmail(
                loginData.email,
            )
            if (!isAccountExist) {
                res.status(404).json({ error: 'Email not exist' })
                return
            }
            const token = await this.authService.loginUser(loginData)

            if (token == null) {
                res.status(401).json({ error: 'Invalid credentials' })
                return
            }
            res.cookie('jwt', token, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: false,
                secure: process.env.NODE_ENV !== 'development',
            })
            res.status(200).json({ message: 'login succesfuly', token: token })
        } catch (error) {
            res.status(500).json({ error: 'login failed' })
        }
    }

    async logout(req: Request, res: Response): Promise<void> {
        try {
            console.log('LOGUT KENA KOK')
            res.cookie('jwt', '', { maxAge: 0 })
            res.status(200).json({ message: 'Logged out successfully' })
        } catch (error) {
            res.status(500).json({ error: 'logout failed' })
        }
    }
}
