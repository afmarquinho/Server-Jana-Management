import { Router } from "express";

const router = Router();

// *ROUTING

router.get("/", (req, res) => {
  res.json("Desde Get");
});
router.post("/", (req, res) => {
  res.json("Desde Post");
});
router.put("/", (req, res) => {
  res.json("Desde put");
});
router.patch("/", (req, res) => {
  res.json("Desde patch");
});
router.delete("/", (req, res) => {
  res.json("Desde delete");
});

export default router