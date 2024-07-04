import { User } from '@/entity/users'
import connectDb from '@/db/mysql'
import { RegisterDto, LoginDto } from '@/dto/auth'
import { generateToken, hashPassword, comparePassword } from '@/helpers/auth'

export class AuthService {
    private userRepository = connectDb.getRepository(User)

    async registerUser(registerData: RegisterDto): Promise<User> {
        const hashedPassword = await hashPassword(registerData.password)
        const user = this.userRepository.create({
            name: registerData.username,
            email: registerData.email,
            password: hashedPassword,
            ImageUrl: 'https://picsum.photos/200',
            role: registerData.role,
            createdAt: new Date(),
        })
        return this.userRepository.save(user)
    }

    async loginUser(loginData: LoginDto): Promise<String | null> {
        const user = await this.findUserByEmail(loginData.email)
        if (!user) return null

        const isValidPassword = await comparePassword(
            loginData.password,
            user.password,
        )
        if (!isValidPassword) {
            return null
        }

        const token = generateToken(user.id)

        return token
    }

    async findUserByEmail(email: string): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({ where: { email } })
            return user || null
        } catch (error) {
            console.error('Error finding user by email:', error)
            return null
        }
    }
}
