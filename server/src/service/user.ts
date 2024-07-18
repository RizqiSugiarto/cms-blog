import connectDb from '@/db/mysql'
import { User } from '@/entity/users'
import { NotFoundError, UnAuthorizedError } from '@/helpers/customErr'
import { UpdateProfileDto } from '@/dto/user'

export class UserService {
    private userRepository = connectDb.getRepository(User)

    async getProfileByUserId(userId: string): Promise<User | null> {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .select(['user.name', 'user.email', 'user.ImageUrl'])
            .where('id = :userId', { userId })
            .getOne()
        if (!user) {
            throw new NotFoundError('User not found')
        }
        return user
    }

    async updateProfileByUserId(updateData: UpdateProfileDto): Promise<void> {
        const user = await this.userRepository.findOne({
            where: { id: updateData.userId },
        })

        if (!user) {
            throw new Error('User not found')
        }

        if (updateData.name !== undefined) {
            user.name = updateData.name
        }

        if (updateData.email !== undefined) {
            user.email = updateData.email
        }


        if (updateData.imageProfile !== undefined) {
            const imgUrl = `http://localhost:5000/uploads/${updateData.imageProfile.filename}`
            user.ImageUrl = imgUrl
        }

        await this.userRepository.save(user)
    }
}
