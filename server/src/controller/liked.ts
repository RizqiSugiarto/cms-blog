import { Request, Response } from 'express'
import { LikedDto } from '@/dto/liked'
import { LikedService } from '@/service/liked'

export class LikedController {
    private likedService: LikedService

    constructor(likedService: LikedService) {
        this.likedService = likedService
    }

    async like(req: Request, res: Response): Promise<void> {
        try {
            const likeData: LikedDto = req.body
            if (!likeData.blogId || !likeData.userId) {
                res.status(400).json({
                    message: 'Bad Request - not valid request',
                })
                return
            }
            likeData.createdAt = new Date
            const newLike = await this.likedService.createLiked(likeData)
            res.status(201).json({ message: newLike })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error })
        }
    }

    async unlike(req: Request, res: Response): Promise<void> {
        try {
            const likeData: LikedDto = req.body
            if (!likeData.blogId || !likeData.userId) {
                res.status(400).json({
                    message: 'Bad Request - not valid request',
                })
                return
            }
            const newLike = await this.likedService.deleteLike(likeData)
            res.status(201).json({ message: newLike })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error })
        }
    }

    async checkLike(req: Request, res: Response): Promise<void> {
        try {
            console.log("KENAA")
            const likeData: LikedDto = req.body
            if (!likeData.blogId || !likeData.userId) {
                res.status(400).json({
                    message: 'Bad Request - not valid request',
                })
                return
            }
            const newLike = await this.likedService.getLikeStatus(likeData)
            res.status(201).json({ message: newLike })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error })
        }
    }

    async getTotalLikePerMonth(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params
            if (!userId) {
                res.status(400).json({
                    message: 'Bad Request - not valid request',
                })
                return
            }
            const resp =
                await this.likedService.getTotalLikePerMonthByUserId(userId)
            res.status(200).json(resp)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error })
        }
    }

    async getMostFavoriteTag(req: Request, res: Response): Promise<void> {
        try {
            const resp = await this.likedService.getMostFavTag()
            res.status(200).json(resp)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}
