import { Router } from 'express';
import { BlogService } from '@/service/blog';
import { BlogController } from '@/controller/blog';
import { upload } from '@/middleware/uploadImage';

const router = Router();
const blogService = new BlogService();
const blogController = new BlogController(blogService);

router.post('/', upload.single('imageUpload'), (req, res, next) => 
    blogController.createBlog(req, res, next)
);
router.get('/tags', (req, res, next) => 
    blogController.getBlogByTag(req, res, next)
);
router.get('/view/:userId', (req, res, next) => 
    blogController.getMostViewBlogUserId(req, res, next)
);
router.put('/:id', (req, res, next) => 
    blogController.updateBlog(req, res, next)
);
router.delete('/:id', (req, res, next) => 
    blogController.deleteBlog(req, res, next)
);
router.get('/user', (req, res, next) => 
    blogController.getAllBlogWithUserProfile(req, res, next)
);
router.get('/user/:userId', (req, res, next) => 
    blogController.getAllBlogsByUserId(req, res, next)
);
router.get('/draft/:userId', (req, res, next) => 
    blogController.getAllBlogsDraftByUserId(req, res, next)
);
router.get('/:id', (req, res, next) => 
    blogController.getBlogById(req, res, next)
);

export default router;
