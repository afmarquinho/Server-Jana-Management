import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";

const handleInputErros = (req: Request, res: Response, next: NextFunction) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
export default handleInputErros;
