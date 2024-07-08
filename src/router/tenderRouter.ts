
import { Router } from "express";
import { createTender } from "../handlers/tender";

const router = Router()

router.post("/", createTender);

export default router