import { NextFunction, Request, Response } from 'express'
import { ViewService } from '@/service/view'
import logger from '@/logger';

export class ViewController {
    private viewService: ViewService

    constructor(viewService: ViewService) {
        this.viewService = viewService
    }

    async view(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { BlogId } = req.params
            if (!BlogId) {
                res.status(400).json({
                    message: 'Bad Request - not valid request',
                })
                return
            }
            const newView = await this.viewService.createView(BlogId)
            res.status(201).json({ message: newView })
        } catch (error: any) {
            logger.error('Error creating view:', error);
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to create view' });
            next(error);
        }
    }

    async getTotalViewPerMonth(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.params;
            if (!userId) {
                res.status(400).json({
                    message: 'Bad Request - not valid request',
                });
                return;
            }
            const resp = await this.viewService.getTotalViewPerMonth(userId);
            res.status(200).json(resp);
        } catch (error: any) {
            logger.error('Error get total view per month:', error);
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to get view per month' });
            next(error);
        }
    }
}
