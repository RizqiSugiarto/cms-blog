import { Blog } from '@/entity/blog'
import { User } from '@/entity/users'
import connectDb from '@/db/mysql'
import { BlogDto } from '@/dto/blog'
import { NotFoundError } from '@/helpers/customErr'
import { trimTag } from '@/helpers/common'
import dotenv from 'dotenv'

dotenv.config()

const BaseUrl = process.env.BASE_URL_IMG

export class BlogService {
    private blogRepository = connectDb.getRepository(Blog)
    private userRepository = connectDb.getRepository(User)

    async createBlog(blogData: BlogDto): Promise<string> {
        const user = await this.userRepository.findOne({
            where: { id: blogData.userId },
        })
        if (!user) {
            throw new NotFoundError('User not found')
        }

        const imgUrl = `${BaseUrl}/${blogData.image.filename}`

        const blog = this.blogRepository.create({
            title: blogData.title,
            imageUrl: imgUrl,
            content: blogData.content,
            isDraft: blogData.isDraft,
            tag: trimTag(blogData.tag),
            user: user,
            createdAt: new Date(),
        })

        await this.blogRepository.save(blog)
        return 'Blog created successfully'
    }

    async getAllBLogWithUserProfile(): Promise<Blog[]> {
        const blogs = await this.blogRepository.find({
            relations: ['user', 'liked'],
        })

        return blogs
    }

    async getBlogsByTags(tags: string): Promise<Blog[]> {
        let blogs

        if (tags.trim() == "All") {
            blogs = await this.blogRepository.find({
                relations: ['user', 'liked'],
            })
        } else {
            blogs = await this.blogRepository.find({
                where: {
                    tag: tags,
                },
                relations: ['user', 'liked'],
            })
        }

        return blogs
    }

    async getAllBlogsByUserId(userId: string): Promise<Blog[]> {
        const blogs = await this.blogRepository.find({
            where: { user: { id: userId }, isDraft: false },
            relations: ['liked', 'view'],
        })

        return blogs
    }

    async getMostViewedBlog(userId: string): Promise<Blog[]> {
        const result = await this.blogRepository
            .createQueryBuilder('blog')
            .leftJoin('blog.view', 'view')
            .select('blog.title')
            .addSelect('COUNT(view.id)', 'viewCount')
            .where('blog.user.id = :userId', { userId })
            .groupBy('blog.id')
            .having('COUNT(view.id) > 0')
            .orderBy('viewCount', 'DESC')
            .limit(5)
            .getRawMany()

        return result
    }

    async updateBlog(id: string, blogData: BlogDto): Promise<string> {
        const blog = await this.blogRepository.findOne({where: {id: id}});
        if (!blog) {
            throw new NotFoundError('Blog not found');
        }

        Object.assign(blog, blogData);
        await this.blogRepository.save(blog);

        return 'Blog updated successfully';
    }

    async deleteBlog(id: string): Promise<string> {
        const blog = await this.blogRepository.findOne({where: {id: id}});
        if (!blog) {
            throw new NotFoundError('Blog not found');
        }

        await this.blogRepository.remove(blog);

        return 'Blog deleted successfully';
    }

    async getBlogById(id: string): Promise<Blog> {
        const blog = await this.blogRepository.findOne({ where: { id }, relations: ['user'] });
        if (!blog) {
            throw new NotFoundError('Blog not found');
        }
        return blog
    }

    async getAllDraft(userId: string): Promise<Blog[]> {
        const blogs = await this.blogRepository.find({
            where: {
                user: { id: userId },
                isDraft: true,
            },
            relations: ['liked', 'view'],
        })

        return blogs
    }
}
