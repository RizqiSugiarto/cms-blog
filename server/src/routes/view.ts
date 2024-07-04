import { ViewController } from '@/controller/view'
import { ViewService } from '@/service/view'
import { Router } from 'express'

const router = Router()
const viewService = new ViewService()
const viewController = new ViewController(viewService)

router.post('/view/:BlogId', (req, res) => viewController.view(req, res))
router.get('/view/:userId', (req, res) =>
    viewController.getTotalViewPerMonth(req, res),
)

export default router
