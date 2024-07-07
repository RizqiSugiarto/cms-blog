import { NextFunction, Request, Response } from 'express'
import { RegisterDto, LoginDto } from '@/dto/auth'
import { AuthService } from '@/service/auth'
import logger from '@/logger'

export class AuthController {
    private authService: AuthService

    constructor(authService: AuthService) {
        this.authService = authService
    }

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const registerData: RegisterDto = req.body;
            const response = await this.authService.registerUser(registerData);
            res.status(201).json(response);
        } catch (error: any) {
            if (error.message === 'Email is already in use') {
                res.status(400).json({ error: error.message }); 
            } else {
                logger.error('Error in register controller:', error);
                res.status(500).json({ error: 'Failed to register user' }); 
            }
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const loginData: LoginDto = req.body
            const response = await this.authService.loginUser(loginData)

            res.cookie('jwt', response, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: false,
                secure: process.env.NODE_ENV !== 'development',
            })
            res.status(200).json({ message: 'login succesfuly', token: response })
        } catch (error: any) {
            if (error.message === 'Email not found' || error.message === 'Wrong password') {
                res.status(401).json({ error: error.message }); 
            } else {
                logger.error('Error in register controller:', error);
                res.status(500).json({ error: 'Failed to register user' }); 
            }
            next(error);
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
