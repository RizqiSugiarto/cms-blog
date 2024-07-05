import { LikedController } from '@/controller/liked'
// import protectRoute from '@/middleware/protectedRoute'
import { LikedService } from '@/service/liked'
import { Router } from 'express'

const router = Router()
const likeService = new LikedService()
const likeController = new LikedController(likeService)

router.post('/', (req, res) => likeController.like(req, res))
router.get('/tag', (req, res) =>
    likeController.getMostFavoriteTag(req, res),
)
router.get('/:userId', (req, res) =>
    likeController.getTotalLikePerMonth(req, res),
)

export default router
