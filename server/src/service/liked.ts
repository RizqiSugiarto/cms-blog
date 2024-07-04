import connectDb from '@/db/mysql'
import { Liked } from '@/entity/liked'
import { User } from '@/entity/users'
import { Blog } from '@/entity/blog'
import { LikedDto } from '@/dto/liked'

type LikesPerMonth = {
    month: string // Month in YYYY-MM format
}

type LikedPerMontResponse = {
    count: number
    data: LikesPerMonth[]
}

type MostLikedTag = {
    tag: string
    totalLikes: number
}

export class LikedService {
    private likedRepository = connectDb.getRepository(Liked)
    private blogRepository = connectDb.getRepository(Blog)
    private userRepository = connectDb.getRepository(User)

    async createLiked(likedData: LikedDto): Promise<string | Error> {
        try {
            const blog = await this.blogRepository.findOne({
                where: { id: likedData.blogId },
            })
            const user = await this.userRepository.findOne({
                where: { id: likedData.userId },
            })

            if (!blog) {
                throw new Error('Blog not found')
            }

            if (!user) {
                throw new Error('User not found')
            }

            const liked = this.likedRepository.create({
                blog: blog,
                user: user,
                createdAt: new Date(),
            })

            await this.likedRepository.save(liked)
            return 'Liked successfully created'
        } catch (error) {
            console.error('Error in createLiked service:', error)
            throw new Error('Failed to create like')
        }
    }

    async getTotalLikePerMonthByUserId(
        userId: string,
    ): Promise<LikedPerMontResponse> {
        try {
            const result: LikesPerMonth[] = await this.likedRepository
                .createQueryBuilder('liked')
                .select('DATE_FORMAT(liked.createdAt, "%Y-%m") as month')
                .addSelect('COUNT(liked.id)', 'totalLikes')
                .leftJoin('liked.blog', 'blog')
                .leftJoin('blog.user', 'user')
                .where('user.id = :userId', { userId })
                .groupBy('month')
                .orderBy('month', 'ASC')
                .getRawMany()

            return {
                count: result.length,
                data: result,
            }
        } catch (error) {
            console.error('Error in getTotalLikedPerMonth service:', error)
            throw new Error('Failed to get like')
        }
    }

    async getMostFavTag(): Promise<MostLikedTag[]> {
        try {
            const result: MostLikedTag[] = await this.likedRepository
                .createQueryBuilder('liked')
                .select('blog.tag', 'tag')
                .addSelect('COUNT(liked.id)', 'totalLikes')
                .leftJoin('liked.blog', 'blog')
                .groupBy('blog.tag')
                .orderBy('totalLikes', 'DESC')
                .getRawMany()

            return result
        } catch (error) {
            console.error('Error in getTotalLikedPerMonth service:', error)
            throw new Error('Failed to get like')
        }
    }
}
