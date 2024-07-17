import { Router } from 'express';
import { LikedService } from '@/service/liked';
import { LikedController } from '@/controller/liked';

const router = Router();
const likedService = new LikedService();
const likedController = new LikedController(likedService);

router.post('/', (req, res, next) => likedController.createLiked(req, res, next));
router.get('/total/:userId', (req, res, next) => likedController.getTotalLikePerMonthByUserId(req, res, next));
router.delete('/', (req, res, next) => likedController.deleteLike(req, res, next));
router.get('/status', (req, res, next) => likedController.getLikeStatus(req, res, next));
router.get('/most-fav-tag', (req, res, next) => likedController.getMostFavTag(req, res, next));

export default router;
