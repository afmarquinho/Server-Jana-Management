import { Router } from "express";
import { getProfilePic, uploadPicture } from "../handlers/uploadsController";
import { authenticate } from "../middlewares/auth";

const router = Router();
router.use(authenticate)

router.get("/profile-picture/:id", getProfilePic);

router.post("/profile-picture/:id", uploadPicture);

export default router;
