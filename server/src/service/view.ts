import connectDb from '@/db/mysql';
import { Blog } from '@/entity/blog';
import { View } from '@/entity/view';
import { NotFoundError } from '@/helpers/customErr';
import logger from '@/logger';

type ViewPerMonth = {
    month: string;
};

type ViewPerMonthResponse = {
    count: number;
    data: ViewPerMonth[];
};

export class ViewService {
    private blogRepository = connectDb.getRepository(Blog);
    private viewRepository = connectDb.getRepository(View);

    async createView(blogId: string): Promise<string> {
        try {
            const blog = await this.blogRepository.findOne({
                where: { id: blogId },
            });

            if (!blog) {
                throw new NotFoundError('Blog not found');
            }

            const viewed = this.viewRepository.create({
                blog: blog,
                createdAt: new Date(),
            });

            await this.viewRepository.save(viewed);
            return 'View successfully created';
        } catch (error: any) {
            logger.error('Error in create view service:', error);
            throw new Error('Failed to create view');
        }
    }

    async getTotalViewPerMonth(userId: string): Promise<ViewPerMonthResponse> {
        try {
            const result: ViewPerMonth[] = await this.viewRepository
                .createQueryBuilder('view')
                .select('DATE_FORMAT(view.createdAt, "%Y-%m") as month')
                .addSelect('COUNT(view.id)', 'totalView')
                .leftJoin('view.blog', 'blog')
                .leftJoin('blog.user', 'user')
                .where('user.id = :userId', { userId })
                .groupBy('month')
                .orderBy('month', 'ASC')
                .getRawMany();

            return {
                count: result.length,
                data: result,
            };
        } catch (error: any) {
            logger.error('Error in get total view service:', error);
            throw new Error('Failed to get total view');
        }
    }
}
