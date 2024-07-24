import { Request, Response, NextFunction } from 'express';
import { BlogDto } from '@/dto/blog';
import { BlogService } from '@/service/blog';
import logger from '@/logger';

export class BlogController {
    private blogService: BlogService;

    constructor(blogService: BlogService) {
        this.blogService = blogService;
    }

    async createBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { title, content, isDraft, tag, userId } = req.body;
            const image = req.file;

            const isDraftBoolean = isDraft === 'true';

            const blogData: BlogDto = {
                title,
                content,
                userId,
                image,
                isDraft: isDraftBoolean,
                tag,
            };

            const message = await this.blogService.createBlog(blogData);
            res.status(201).json({ message });
        } catch (error: any) {
            logger.error('Error creating blog:', error);
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to create blog' });
            next(error);
        }
    }

    async getAllBlogWithUserProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.blogService.getAllBLogWithUserProfile();
            res.status(200).json(response);
        } catch (error: any) {
            logger.error('Error fetching blogs with user profile:', error);
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to fetch blogs' });
            next(error);
        }
    }

    async updateBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const blogData: BlogDto = req.body;
            const message = await this.blogService.updateBlog(id, blogData);
            res.status(200).json({ message });
        } catch (error: any) {
            logger.error('Error updating blog:', error);
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to update blog' });
            next(error);
        }
    }

    async deleteBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const message = await this.blogService.deleteBlog(id);
            res.status(200).json({ message });
        } catch (error: any) {
            logger.error('Error deleting blog:', error);
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to delete blog' });
            next(error);
        }
    }

    async getAllBlogsByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.params;
            const blogs = await this.blogService.getAllBlogsByUserId(userId);
            res.status(200).json(blogs);
        } catch (error: any) {
            logger.error('Error fetching blogs by user ID:', error);
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to fetch blogs' });
            next(error);
        }
    }

    async getBlogById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const blog = await this.blogService.getBlogById(id);
            if (!blog) {
                res.status(404).json({ error: 'Blog not found' });
                return;
            }
            res.status(200).json(blog);
        } catch (error: any) {
            logger.error('Error fetching blog by ID:', error);
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to fetch blog' });
            next(error);
        }
    }

    async getBlogByTag(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { tag } = req.query;
            const blog = await this.blogService.getBlogsByTags(tag as string);
            if (!blog) {
                res.status(404).json({ error: 'Blog not found' });
                return;
            }
            res.status(200).json(blog);
        } catch (error: any) {
            logger.error('Error fetching blog by tag:', error);
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to fetch blog' });
            next(error);
        }
    }

    async getAllBlogsDraftByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.params;
            const blogs = await this.blogService.getAllDraft(userId);
            res.status(200).json(blogs);
        } catch (error: any) {
            logger.error('Error fetching draft blogs by user ID:', error);
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to fetch draft blogs' });
            next(error);
        }
    }

    async getMostViewBlogUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.params;
            const blogs = await this.blogService.getMostViewedBlog(userId);
            res.status(200).json(blogs);
        } catch (error: any) {
            logger.error('Error fetching most viewed blogs by user ID:', error);
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to fetch most viewed blogs' });
            next(error);
        }
    }
    
    async getStatsByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.params;
            const blogs = await this.blogService.getStatsBlog(userId);
            res.status(200).json(blogs);
        } catch (error: any) {
            logger.error('Error fetching most viewed blogs by user ID:', error);
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to fetch most viewed blogs' });
            next(error);
        }
    }
}
