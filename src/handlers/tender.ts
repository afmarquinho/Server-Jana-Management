import { Request, Response } from "express";
import Report from "../models/Report.model";
import Tender from "../models/Tender.model";
import colors from "colors";

export const createTender = async (req: Request, res: Response) => {
  const  tenderData  = req.body;
  try {
    const newTender = await Tender.create(tenderData);
    const report = await Report.findByPk(tenderData.reportId)
    if (!report) {
        console.error("Report no encontrado");
        return res.status(404).json({ error: "Reporte no encontrado" });
      }
      await report.update({tenderID: newTender.id })

      const fullTender = await Tender.findByPk(newTender.id, {
        include: [{ model: Report }],
      });


      res.status(201).json({data:fullTender})

  } catch (error) {
    console.error("Error al crear la cotización:", error.message);
    res.status(500).json({ error: "Error al crear la cotización" });

  }
};
