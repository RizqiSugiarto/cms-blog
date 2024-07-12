import { UserService } from "@/service/user";
import { UserController } from "@/controller/user";
import { Router } from "express";
import { upload } from "@/middleware/uploadImage";

const router = Router()
const userService = new UserService()
const userController = new UserController(userService)

router.get('/profile/:userId', (req, res, next) => userController.Profile(req, res, next))
router.put('/profile/:userId', upload.single('imageProfile'),(req, res, next) => userController.UpdateProfile(req, res, next))


export default router