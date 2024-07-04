import { Request, Response } from 'express'
import { ViewService } from '@/service/view'

export class ViewController {
    private viewService: ViewService

    constructor(viewService: ViewService) {
        this.viewService = viewService
    }

    async view(req: Request, res: Response): Promise<void> {
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
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error })
        }
    }

    async getTotalViewPerMonth(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params
            if (!userId) {
                res.status(400).json({
                    message: 'Bad Request - not valid request',
                })

                return
            }
            const resp = await this.viewService.getTotalViewPerMonth(userId)
            res.status(200).json(resp)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error })
        }
    }
}
