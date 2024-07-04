import { Blog } from '@/entity/blog'
import { User } from '@/entity/users'
import connectDb from '@/db/mysql'
import { BlogDto } from '@/dto/blog'
import { ILike } from 'typeorm'

type likeBaseResponse = {
    id: string
    blogId: string
    userId: string | undefined
    createdAt: Date
}

type view = {
    id: string
    blogId: string | undefined
    createdAt: Date
}

type blogBaseResponse = {
    id: string
    title: string
    imageUrl: string
    tag: string
    content: string
    isDraft: boolean
    createdAt: Date
    updatedAt: Date
    like: likeBaseResponse[]
    view: view[]
}

type blogResponse = {
    count: number
    data: blogBaseResponse[]
}

type mostViewedBlog = {
    blog_title: string
    viewCount: number
}

export class BlogService {
    private blogRepository = connectDb.getRepository(Blog)
    private userRepository = connectDb.getRepository(User)

    async createBlog(blogData: BlogDto): Promise<string> {
        try {
            const user = await this.userRepository.findOne({
                where: { id: blogData.userId },
            })
            if (!user) {
                throw new Error('User not found')
            }

            const blog = this.blogRepository.create({
                title: blogData.title,
                imageUrl: 'https://picsum.photos/200',
                content: blogData.content,
                isDraft: blogData.isDraft,
                tag: blogData.tag,
                user: user,
                createdAt: new Date(),
            })

            await this.blogRepository.save(blog)
            return 'Blog created successfully'
        } catch (error) {
            console.error('Error creating blog:', error)
            throw new Error('Failed to create blog')
        }
    }

    async getBlogsByUserIdSimilarTitle(
        blogData: BlogDto,
    ): Promise<blogResponse> {
        try {
            const blogs = await this.blogRepository.find({
                where: {
                    user: { id: blogData.userId },
                    isDraft: blogData.isDraft,
                    title: ILike(`%${blogData.title}%`),
                },
            })

            const blogsResponse: blogBaseResponse[] = blogs.map((blog) => ({
                id: blog.id,
                title: blog.title,
                imageUrl: blog.imageUrl,
                tag: blog.tag,
                content: blog.content,
                isDraft: blog.isDraft,
                createdAt: blog.createdAt,
                updatedAt: blog.updatedAt,
                like: blog.liked.map((liked) => ({
                    id: liked.id,
                    blogId: liked.blog ? liked.blog.id : '',
                    userId: liked.user ? liked.user.id : '',
                    createdAt: liked.createdAt,
                })),
                view: blog.view.map((view) => ({
                    id: view.id,
                    blogId: view.blog ? view.blog.id : '',
                    createdAt: view.createdAt,
                })),
            }))

            return {
                count: blogs.length,
                data: blogsResponse,
            }
        } catch (error) {
            console.error('Error fetching blogs by user ID:', error)
            throw new Error('Failed to fetch blogs')
        }
    }

    async getAllBlogsByUserId(userId: string): Promise<blogResponse> {
        try {
            const blogs = await this.blogRepository.find({
                where: { user: { id: userId }, isDraft: false },
                relations: ['liked', 'view'],
            })

            const blogsResponse: blogBaseResponse[] = blogs.map((blog) => ({
                id: blog.id,
                title: blog.title,
                imageUrl: blog.imageUrl,
                tag: blog.tag,
                content: blog.content,
                isDraft: blog.isDraft,
                createdAt: blog.createdAt,
                updatedAt: blog.updatedAt,
                like: blog.liked.map((liked) => ({
                    id: liked.id,
                    blogId: liked.blog ? liked.blog.id : '',
                    userId: liked.user ? liked.user.id : '',
                    createdAt: liked.createdAt,
                })),
                view: blog.view.map((view) => ({
                    id: view.id,
                    blogId: view.blog ? view.blog.id : '',
                    createdAt: view.createdAt,
                })),
            }))

            return {
                count: blogsResponse.length,
                data: blogsResponse,
            }
        } catch (error) {
            console.error('Error fetching blogs by user ID:', error)
            throw new Error('Failed to fetch blogs')
        }
    }

    async getMostViewedBlog(userId: string): Promise<mostViewedBlog[]> {
        try {
            const result: mostViewedBlog[] = await this.blogRepository
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
        } catch (error) {
            console.error('Error fetching blogs by user ID:', error)
            throw new Error('Failed to fetch blogs')
        }
    }

    async updateBlog(id: string, blogData: BlogDto): Promise<string> {
        try {
            const blog = await this.blogRepository.findOne({ where: { id } })
            if (!blog) {
                throw new Error('Blog not found')
            }

            blog.title = blogData.title
            blog.content = blogData.content
            blog.imageUrl = blogData.imageUrl
            blog.isDraft = blogData.isDraft
            blog.updatedAt = new Date()

            if (blogData.tag) blog.tag = blogData.tag

            await this.blogRepository.save(blog)
            return 'Blog updated successfully'
        } catch (error) {
            console.error('Error updating blog:', error)
            throw new Error('Failed to update blog')
        }
    }

    async deleteBlog(id: string): Promise<string> {
        try {
            const result = await this.blogRepository.delete(id)
            if (result.affected === 0) {
                throw new Error('Blog not found')
            }
            return 'Blog deleted successfully'
        } catch (error) {
            console.error('Error deleting blog:', error)
            throw new Error('Failed to delete blog')
        }
    }

    async getBlogById(id: string): Promise<Blog | null> {
        try {
            return await this.blogRepository.findOne({ where: { id } })
        } catch (error) {
            console.error('Error fetching blog by ID:', error)
            throw new Error('Failed to fetch blog')
        }
    }

    async getAllDraft(userId: string): Promise<blogResponse> {
        try {
            const blogs = await this.blogRepository.find({
                where: {
                    user: { id: userId },
                    isDraft: true,
                },
            })

            const blogsResponse: blogBaseResponse[] = blogs.map((blog) => ({
                id: blog.id,
                title: blog.title,
                imageUrl: blog.imageUrl,
                tag: blog.tag,
                content: blog.content,
                isDraft: blog.isDraft,
                createdAt: blog.createdAt,
                updatedAt: blog.updatedAt,
                like: blog.liked.map((liked) => ({
                    id: liked.id,
                    blogId: liked.blog ? liked.blog.id : '',
                    userId: liked.user ? liked.user.id : '',
                    createdAt: liked.createdAt,
                })),
                view: blog.view.map((view) => ({
                    id: view.id,
                    blogId: view.blog ? view.blog.id : '',
                    createdAt: view.createdAt,
                })),
            }))

            return {
                count: blogs.length,
                data: blogsResponse,
            }
        } catch (error) {
            console.error('Error when get All draft', error)
            throw new Error('Failed to fetch draft blog')
        }
    }
}
