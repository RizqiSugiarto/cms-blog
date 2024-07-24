import { NextFunction, Request, Response } from 'express';
import { LikedDto } from '@/dto/liked';
import { LikedService } from '@/service/liked';
import logger from '@/logger';

export class LikedController {
    private likedService: LikedService;

    constructor(likedService: LikedService) {
        this.likedService = likedService;
    }

    async createLiked(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const likedData: LikedDto = req.body;
            const response = await this.likedService.createLiked(likedData);
            res.status(201).json({message: response});
        } catch (error: any) {
            logger.error('Error in createLiked controller:', error);
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to create like' });
            next(error);
        }
    }

    async getTotalLikePerMonthByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.params;
            const response = await this.likedService.getTotalLikePerMonthByUserId(userId);
            res.status(200).json(response);
        } catch (error: any) {
            logger.error('Error in getTotalLikePerMonthByUserId controller:', error);
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to get likes' });
            next(error);
        }
    }

    async deleteLike(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const likedData: LikedDto = req.body;
            const response = await this.likedService.deleteLike(likedData);
            res.status(200).json(response);
        } catch (error: any) {
            logger.error('Error in deleteLike controller:', error);
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to delete like' });
            next(error);
        }
    }

    async getLikeStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const likedData: LikedDto = req.body;
            const response = await this.likedService.getLikeStatus(likedData);
            res.status(200).json(response);
        } catch (error: any) {
            logger.error('Error in getLikeStatus controller:', error);
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to get like status' });
            next(error);
        }
    }

    async getMostFavTag(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.likedService.getMostFavTag();
            res.status(200).json(response);
        } catch (error: any) {
            logger.error('Error in getMostFavTag controller:', error);
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to get most favorite tags' });
            next(error);
        }
    }
}
