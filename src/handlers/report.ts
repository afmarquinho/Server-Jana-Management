import { Request, Response } from "express";
import Report from "../models/Report.model";

//? CREATE REPORTS
export const createReport = async (req: Request, res: Response) => {
  try {
    const reportData = req.body;
    const newReport = await Report.create(reportData);
    res.status(201).json({ data: newReport });
  } catch (error) {
    console.error("Error al crear el reporte:", error.message);
    const err = new Error("Error al crear el reporte");
    res.status(500).json({ error: err.message });
  }
};


//? GET REPORTS
export const getReports = async (req: Request, res: Response) => {
  try {
    const reports = await Report.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).json({ data: reports });
  } catch (error) {
    console.error("Error al obtener los reportes:", error.message);
    res.status(500).json({ error: "Error al obtener los reportes" });
  }
};
//? GET REPORT BY ID
export const getReportbyId = async (req: Request, res: Response) => {
  const reportId = req.params.id;

  try {
    const report = await Report.findByPk(reportId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!report) {
      res
        .status(404)
        .json({ error: "Reporte no encontrado por parámetro inválido" });
      console.error("Reporte no encontrado por parámetro inválido");
      return;
    }
    res.status(200).json({ data: report });
  } catch (error) {
    console.error("Error al obtener el reporte:", error.message);
    res.status(500).json({ error: "Error al obtener el reporte" });
  }
};

//? UPDATE REPORT BY ID
export const updateReport = async (req: Request, res: Response) => {
  const reportId = req.params.id;
  const reportData = req.body;

  try {
    const report = await Report.findByPk(reportId);

    if (!report) {
      console.error("Reporte no encontrado por parámetro inválido");
      return res
        .status(404)
        .json({ error: "Reporte no encontrado por parámetro inválido" });
    }

    const updatedReport = await report.update(reportData);

    res.status(200).json({ data: updatedReport });
  } catch (error) {
    console.error("Error al actualizar el reporte:", error.message);
    res.status(500).json({ error: "Error al actualizar el reporte" });
  }
};

export const updateReportProcessed = async (req: Request, res: Response) => {
  const reportId = req.params.id;

  try {
    const report = await Report.findByPk(reportId);

    if (!report) {
      res
        .status(404)
        .json({ error: "Reporte no encontrado por parámetro inválido" });
      console.error("Reporte no encontrado por parámetro inválido");
      return;
    }

    const updatedReport = await report.update({ processed: true });

    res.status(200).json({ data: updatedReport });
  } catch (error) {
    console.error("Error al actualizar el reporte:", error.message);
    res.status(500).json({ error: "Error al actualizar el reporte" });
  }
};

//? DELETE REPORT

export const deleteReport = async (req: Request, res: Response) => {
  const reportId = req.params.id; // Obtener el ID del reporte desde los parámetros de la solicitud

  try {
    const report = await Report.findByPk(reportId);

    if (!report) {
      res
        .status(404)
        .json({ error: "Reporte no encontrado por parámetro inválido" });
      console.error("Reporte no encontrado por parámetro inválido");
      return;
    }

    res.status(200).json({
      data: "Reporte y registros asociados eliminados correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar el reporte:", error.message);
    res.status(500).json({ error: "Error al eliminar el reporte" });
  }
};
