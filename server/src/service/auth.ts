import { User } from '@/entity/users'
import connectDb from '@/db/mysql'
import { RegisterDto, LoginDto } from '@/dto/auth'
import { generateToken, hashPassword, comparePassword } from '@/helpers/auth'
import { NotFoundError, UnAuthorizedError } from '@/helpers/customErr'

interface LoginResponse {
    user: User; 
    token: string;
}

export class AuthService {
    private userRepository = connectDb.getRepository(User)

    async registerUser(registerData: RegisterDto): Promise<User> {
        const hashedPassword = await hashPassword(registerData.password)
        const user = this.userRepository.create({
            name: registerData.name,
            email: registerData.email,
            password: hashedPassword,
            ImageUrl: 'https://planetsains.com/wp-content/uploads/2022/09/anonymous-avatar-icon-25.png',
            role: registerData.role,
            createdAt: new Date(),
        })

        const isRegistered = await this.userRepository.findOne({
            where: { email: registerData.email },
        })

        if (isRegistered) {
            throw new UnAuthorizedError('Email is already in use')
        }

        return this.userRepository.save(user)
    }
    
    async loginUser(loginData: LoginDto): Promise<LoginResponse> {
        const user = await this.userRepository.findOne({ where: { email: loginData.email } })
        if (!user) {
            throw new NotFoundError('Email not found')
        }

        if (user.role == 'user' && loginData.appType == 'cms') {
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

        return {
            user: user,
            token: token
        }
    }
}
