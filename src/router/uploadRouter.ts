import { Router } from "express";
import { getProfilePic, uploadPicture } from "../handlers/uploads";

const router = Router();

router.get("/profile-picture/:id", getProfilePic);

router.post("/profile-picture/:id", uploadPicture);

export default router;
