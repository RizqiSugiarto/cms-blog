import { NextFunction, Request, Response } from 'express'
import { RegisterDto, LoginDto } from '@/dto/auth'
import { AuthService } from '@/service/auth'
import logger from '@/logger'

export class AuthController {
    private authService: AuthService

    constructor(authService: AuthService) {
        this.authService = authService
    }

    async register(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const registerData: RegisterDto = req.body
            const response = await this.authService.registerUser(registerData)
            res.status(201).json(response)
        } catch (error: any) {
            if (error.message === 'Email is already in use') {
                res.status(400).json({ error: error.message })
            } else {
                logger.error('Error in register controller:', error)
                res.status(500).json({ error: 'Failed to register user' })
            }
            next(error)
        }
    }

    async login(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const loginData: LoginDto = req.body
            const appType = req.headers['x-web-app']
            if (!appType) {
                res.status(400).json({ message: 'Bad Request' })
                return
            }

            loginData.appType = appType as string

            const data = await this.authService.loginUser(loginData)

            res.status(200).json({
                message: 'login succesfuly',
                data,
            })
        } catch (error: any) {
            next(error)
        }
    }

}
