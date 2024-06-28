import { Request, Response } from 'express';
import { ArticleDto } from '@/dto/artichel';
import { ArticleService } from '@/service/artichel';

export class ArticleController {
    private articleService: ArticleService;

    constructor(articleService: ArticleService) {
        this.articleService = articleService;
    }

    async createArticle(req: Request, res: Response): Promise<void> {
        try {
            const articleData: ArticleDto = req.body;
            const message = await this.articleService.createArticle(articleData);
            res.status(201).json({ message });
        } catch (error) {
            console.error('Error creating article:', error);
            res.status(500).json({ error: 'Failed to create article' });
        }
    }

    async updateArticle(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const articleData: ArticleDto = req.body;
            const message = await this.articleService.updateArticle(id, articleData);
            res.status(200).json({ message });
        } catch (error) {
            console.error('Error updating article:', error);
            res.status(500).json({ error: 'Failed to update article' });
        }
    }

    async deleteArticle(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const message = await this.articleService.deleteArticle(id);
            res.status(200).json({ message });
        } catch (error) {
            console.error('Error deleting article:', error);
            res.status(500).json({ error: 'Failed to delete article' });
        }
    }

    async getAllArticlesByUserId(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const articles = await this.articleService.getAllArticlesByUserId(userId);
            res.status(200).json(articles);
        } catch (error) {
            console.error('Error fetching articles by user ID:', error);
            res.status(500).json({ error: 'Failed to fetch articles' });
        }
    }

    async getArticleById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const article = await this.articleService.getArticleById(id);
            if (!article) {
                res.status(404).json({ error: 'Article not found' });
                return;
            }
            res.status(200).json(article);
        } catch (error) {
            console.error('Error fetching article by ID:', error);
            res.status(500).json({ error: 'Failed to fetch article' });
        }
    }
}
