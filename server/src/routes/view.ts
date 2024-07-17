import { ViewController } from '@/controller/view'
import { ViewService } from '@/service/view'
import { Router } from 'express'

const router = Router()
const viewService = new ViewService()
const viewController = new ViewController(viewService)

router.post('/:BlogId', (req, res, next) => viewController.view(req, res, next))
router.get('/:userId', (req, res, next) => viewController.getTotalViewPerMonth(req, res, next))

export default router
