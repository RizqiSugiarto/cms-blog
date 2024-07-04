import { Router } from 'express'
import { BlogService } from '@/service/blog'
import { BlogController } from '@/controller/blog'
// import  from '@/middleware/protectedRoute';

const router = Router()
const blogService = new BlogService()
const blogController = new BlogController(blogService)

router.post('/blogs', (req, res) => blogController.createBlog(req, res))
router.get('/blogs/similar', (req, res) =>
    blogController.getBlogBySimilarName(req, res),
)
router.get('/blogs/view/:userId', (req, res) =>
    blogController.getMostViewBlogUserId(req, res),
)
router.put('/blogs/:id', (req, res) => blogController.updateBlog(req, res))
router.delete('/blogs/:id', (req, res) => blogController.deleteBlog(req, res))
router.get('/blogs/user/:userId', (req, res) =>
    blogController.getAllBlogsByUserId(req, res),
)
router.get('/blogs/draft/:userId', (req, res) =>
    blogController.getAllBlogsDraftByUserId(req, res),
)
router.get('/blogs/:id', (req, res) => blogController.getBlogById(req, res))

export default router
