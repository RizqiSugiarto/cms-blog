import connectDb from '@/db/mysql';
import { Liked } from '@/entity/liked';
import { User } from '@/entity/users';
import { Blog } from '@/entity/blog';
import { LikedDto } from '@/dto/liked';
import { NotFoundError, UnAuthorizedError } from '@/helpers/customErr';
import { QueryRunner } from 'typeorm';

type LikesPerMonth = {
    month: string 
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
    private likedRepository = connectDb.getRepository(Liked);

    async createLiked(likedData: LikedDto): Promise<string | Error> {
        const queryRunner: QueryRunner = connectDb.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
    
        try {
            const existingLike = await queryRunner.manager.findOne(Liked, {
                where: { user: { id: likedData.userId }, blog: { id: likedData.blogId } },
                relations: ['user', 'blog']
            });
    
            if (existingLike) {
                await queryRunner.manager.remove(Liked, existingLike);
                await queryRunner.commitTransaction();
                return 'Unlike successfully';
            }
    
            const user = await queryRunner.manager.findOne(User, { where: { id: likedData.userId } });
            const blog = await queryRunner.manager.findOne(Blog, { where: { id: likedData.blogId } });
    
            if (!user || !blog) {
                throw new NotFoundError('User or Blog not found');
            }
    
            const newLike = this.likedRepository.create({
                user: user,
                blog: blog
            });
    
            await queryRunner.manager.save(Liked, newLike);
            await queryRunner.commitTransaction();
            return 'Liked successfully created';
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('Error in createLiked service:', error);
            throw new Error('Failed to create like');
        } finally {
            await queryRunner.release();
        }
    }
    
    async getTotalLikePerMonthByUserId(userId: string): Promise<LikedPerMontResponse> {
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
                .getRawMany();

            return {
                count: result.length,
                data: result,
            };
        } catch (error) {
            console.error('Error in getTotalLikedPerMonth service:', error);
            throw new Error('Failed to get like');
        }
    }

    async deleteLike(likeData: LikedDto): Promise<string> {
        const like = await this.likedRepository.findOne({
            where: {
                user: { id: likeData.userId },
                blog: { id: likeData.blogId },
            },
            relations: ['user', 'blog'],
        });
    
        if (!like) {
            throw new NotFoundError('Like not found');
        }
    
        await this.likedRepository.remove(like);
    
        return 'Like successfully deleted';
    }

    async getLikeStatus(likeData: LikedDto): Promise<boolean> {
        const like = await this.likedRepository.findOne({
            where: {
                user: { id: likeData.userId },
                blog: { id: likeData.blogId }
            },
            relations: ['user', 'blog']
        });
        return !!like;
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
                .getRawMany();

            return result;
        } catch (error) {
            console.error('Error in getMostFavTag service:', error);
            throw new Error('Failed to get favorite tags');
        }
    }
}
