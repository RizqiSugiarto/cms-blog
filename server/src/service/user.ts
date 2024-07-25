import connectDb from '@/db/mysql'
import { User } from '@/entity/users'
import { NotFoundError, UnAuthorizedError } from '@/helpers/customErr'
import { UpdateProfileDto } from '@/dto/user'
import path from 'path'
import * as fs from 'fs-extra';


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
        const BaseUrlImage = process.env.BASE_URL_IMG
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

        const oldImagePath = user.ImageUrl.replace(BaseUrlImage!, "");

        if (updateData.imageProfile && updateData.imageProfile.filename !== user.ImageUrl) {
            const oldImagePathFull = path.join(__dirname, '../../public/uploads', oldImagePath);
            try {
                await fs.remove(oldImagePathFull);
            } catch (error) {
                console.error(`Error deleting old image file: ${error}`);
            }
            const imgUrl = `${BaseUrlImage}/${updateData.imageProfile.filename}`
            user.ImageUrl = imgUrl
        }

        await this.userRepository.save(user)
    }
}
