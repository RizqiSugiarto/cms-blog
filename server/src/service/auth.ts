import { User } from '@/entity/users'
import connectDb from '@/db/mysql'
import { RegisterDto, LoginDto } from '@/dto/auth'
import { generateToken, hashPassword, comparePassword } from '@/helpers/auth'
import {NotFoundError, UnAuthorizedError} from '@/helpers/customErr'

export class AuthService {
    private userRepository = connectDb.getRepository(User)

    async registerUser(registerData: RegisterDto): Promise<User> {
        try {
            const hashedPassword = await hashPassword(registerData.password)
            const user = this.userRepository.create({
            name: registerData.name,
            email: registerData.email,
            password: hashedPassword,
            ImageUrl: 'https://picsum.photos/200',
            role: registerData.role,
            createdAt: new Date(),
        })

        const isRegistered = await this.userRepository.findOne({ where: { email: registerData.email } })

        if(isRegistered) {
            throw new Error('Email is already in use')
        }

        return this.userRepository.save(user)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async loginUser(loginData: LoginDto): Promise<String> {
        const user = await this.findUserByEmail(loginData.email)
        if (!user) {
            throw new NotFoundError('Email not found')
        }

        if(user.role == 'user' && loginData.appType == 'cms') {
            throw new UnAuthorizedError('User not authorized for CMS')
        }

        const isValidPassword = await comparePassword(
            loginData.password,
            user.password,
        )
        if (!isValidPassword) {
            throw new UnAuthorizedError('Wrong password')
        }

        const token = generateToken(user.id)

        return token
    }

    async findUserByEmail(email: string): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({ where: { email } })
            return user 
        } catch (error) {
            console.error('Error finding user by email:', error)
            return null
        }
    }

    async getProfileByUserId(userId: string): Promise<User | null> {
        const user = await this.userRepository.createQueryBuilder('user')
                    .select(['user.name', 'user.email', 'user.ImageUrl'])
                    .where('id = :userId', {userId})
                    .getOne()
        if(!user) {
            throw new NotFoundError('User not found')
        }
        return user
    }
}
