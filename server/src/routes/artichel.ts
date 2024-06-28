import { Router } from 'express';
import { ArticleService } from '@/service/artichel';
import { ArticleController } from '@/controller/arthicels';
import protectRoute from '@/middleware/protectedRoute';

const router = Router();
const articleService = new ArticleService();
const articleController = new ArticleController(articleService);

router.post('/articles', protectRoute, (req, res) => articleController.createArticle(req, res));
router.put('/articles/:id', protectRoute, (req, res) => articleController.updateArticle(req, res));
router.delete('/articles/:id', protectRoute, (req, res) => articleController.deleteArticle(req, res));
router.get('/articles/user/:userId', protectRoute, (req, res) => articleController.getAllArticlesByUserId(req, res));
router.get('/articles/:id', protectRoute, (req, res) => articleController.getArticleById(req, res));

export default router;
