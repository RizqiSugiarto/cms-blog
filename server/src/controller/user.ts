import { UpdateProfileDto } from '@/dto/user'
import { UserService } from '@/service/user'
import { NextFunction, Request, Response } from 'express'

export class UserController {
    private userService: UserService

    constructor(userService: UserService) {
        this.userService = userService
    }

    async Profile(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { userId } = req.params
            const data = await this.userService.getProfileByUserId(userId)
            res.status(200).json({ data })
        } catch (error) {
            next(error)
        }
    }

    async UpdateProfile(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { userId } = req.params
            const { name, email } = req.body
            const imageProfile = req.file

            const profileData: UpdateProfileDto = {
                userId: userId,
                name: name,
                email: email,
                imageProfile: imageProfile,
            }
            await this.userService.updateProfileByUserId(profileData)
            res.status(200).json({ message: 'updated sucsessfuly' })
        } catch (error) {
            next(error)
        }
    }
}
