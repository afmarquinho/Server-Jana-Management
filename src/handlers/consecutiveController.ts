import { Request, Response } from "express";
import Tender from "../models/Tender.model";
import Consecutive from "../models/Consecutive.model";

const generateConsecutiveCode = (counter: number, year: number): string => {
  const formattedCounter = counter.toString().padStart(4, "0");
  return `TCCP-MAN-${formattedCounter}-${year.toString().slice(-2)}`;
};

const createConsecutive = async (req: Request, res: Response) => {
  const { tenderId } = req.params;

  try {
    // 1. Validate if the Tender exists
    const tender = await Tender.findByPk(tenderId);
    if (!tender) {
      return res.status(404).json({ error: "Cotización no encontrada" });
    }

    // 2. Check if the Tender already has a Consecutive
    if (tender.dataValues.code) {
      // Cambiado para usar tender.code en lugar de tender.dataValues.consecutive
      return  res.status(201).json({ data: tender.dataValues.code });
    }

    // 3. Generate the Consecutive code
    const year = new Date().getFullYear();
    const lastConsecutive = await Consecutive.findOne({
      order: [["createdAt", "DESC"]],
    });

    const counter = lastConsecutive
      ? lastConsecutive.dataValues.counter + 1
      : 1;
    const code = generateConsecutiveCode(counter, year);

    // 4. Create the Consecutive
    const newConsecutive = await Consecutive.create({
      counter,
      year,
      code: code,
      tenderId: tender.id,
    });

    // 5. Update the Tender with the new Consecutive code
    await tender.update({ code });

    // 6. Send the response
    res.status(201).json({ data: newConsecutive.dataValues.code });
  } catch (error) {
    console.error("Error al generar el consecutivo:", error);
    res.status(500).json({ error: "Error al generar el consecutivo" });
  }
};

export default createConsecutive;
