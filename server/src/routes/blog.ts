import { Router } from 'express'
import { BlogService } from '@/service/blog'
import { BlogController } from '@/controller/blog'
// import  from '@/middleware/protectedRoute';
import { upload } from '@/middleware/uploadImage'

const router = Router()
const blogService = new BlogService()
const blogController = new BlogController(blogService)

router.post('/', upload.single('imageUpload'),(req, res) => blogController.createBlog(req, res))
router.get('/similar', (req, res) =>
    blogController.getBlogBySimilarName(req, res),
)
router.get('/view/:userId', (req, res) =>
    blogController.getMostViewBlogUserId(req, res),
)
router.put('/:id', (req, res) => blogController.updateBlog(req, res))
router.delete('/:id', (req, res) => blogController.deleteBlog(req, res))
router.get('/user/:userId', (req, res) =>
    blogController.getAllBlogsByUserId(req, res),
)
router.get('/draft/:userId', (req, res) =>
    blogController.getAllBlogsDraftByUserId(req, res),
)
router.get('/:id', (req, res) => blogController.getBlogById(req, res))

export default router
