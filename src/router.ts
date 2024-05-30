import { Router } from "express";
import { createReport } from "./handlers/report";
import { body } from "express-validator";
import handleInputErros from "./middlewares/handleInputErros";

const router = Router();

// *ROUTING

router.get("/", (req, res) => {
  res.json("Desde Get");
});
router.post(
  "/",
  body("visitDate")
    .notEmpty()
    .withMessage("La fecha de visita no puede estar vacía"),
  body("name")
    .notEmpty()
    .withMessage("El nombre de la cotización no puede estar vacío"),
    handleInputErros,
  createReport
);

router.put("/", (req, res) => {
  res.json("Desde put");
});
router.patch("/", (req, res) => {
  res.json("Desde patch");
});
router.delete("/", (req, res) => {
  res.json("Desde delete");
});

export default router;
