import { Request, Response } from 'express'
import { BlogDto } from '@/dto/blog'
import { BlogService } from '@/service/blog'

export class BlogController {
    private blogService: BlogService

    constructor(blogService: BlogService) {
        this.blogService = blogService
    }

    async createBlog(req: Request, res: Response): Promise<void> {
        try {
            const blogData: BlogDto = req.body
            const message = await this.blogService.createBlog(blogData)
            res.status(201).json({ message })
        } catch (error) {
            console.error('Error creating blog:', error)
            res.status(500).json({ error: 'Failed to create blog' })
        }
    }

    async updateBlog(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const blogData: BlogDto = req.body
            const message = await this.blogService.updateBlog(id, blogData)
            res.status(200).json({ message })
        } catch (error) {
            console.error('Error updating blog:', error)
            res.status(500).json({ error: 'Failed to update blog' })
        }
    }

    async deleteBlog(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const message = await this.blogService.deleteBlog(id)
            res.status(200).json({ message })
        } catch (error) {
            console.error('Error deleting blog:', error)
            res.status(500).json({ error: 'Failed to delete blog' })
        }
    }

    async getAllBlogsByUserId(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params
            const blogs = await this.blogService.getAllBlogsByUserId(userId)
            res.status(200).json(blogs)
        } catch (error) {
            console.error('Error fetching blogs by user ID:', error)
            res.status(500).json({ error: 'Failed to fetch blogs' })
        }
    }

    async getBlogById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const blog = await this.blogService.getBlogById(id)
            if (!blog) {
                res.status(404).json({ error: 'Blog not found' })
                return
            }
            res.status(200).json(blog)
        } catch (error) {
            console.error('Error fetching blog by ID:', error)
            res.status(500).json({ error: 'Failed to fetch blog' })
        }
    }

    async getBlogBySimilarName(req: Request, res: Response): Promise<void> {
        try {
            const blogData: BlogDto = req.body
            const blog =
                await this.blogService.getBlogsByUserIdSimilarTitle(blogData)
            if (!blog) {
                res.status(404).json({ error: 'Blog not found' })
                return
            }
            res.status(200).json(blog)
        } catch (error) {
            console.error('Error fetching similar name blog:', error)
            res.status(500).json({ error: 'Failed to fetch blog' })
        }
    }

    async getAllBlogsDraftByUserId(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params
            const blogs = await this.blogService.getAllDraft(userId)
            res.status(200).json(blogs)
        } catch (error) {
            console.error('Error fetching blogs draft by user ID:', error)
            res.status(500).json({ error: 'Failed to draft fetch blogs' })
        }
    }

    async getMostViewBlogUserId(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params
            const blogs = await this.blogService.getMostViewedBlog(userId)
            res.status(200).json(blogs)
        } catch (error) {
            console.error('Error fetching blogs viewed by user ID:', error)
            res.status(500).json({
                error: 'Failed to blogs viewed fetch blogs',
            })
        }
    }
}
