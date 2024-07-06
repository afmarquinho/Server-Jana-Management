import { Request, Response } from "express";
import Report from "../models/Report.model";
import Material from "../models/Material.model";
import Workforce from "../models/Worforce.model";
import db from "../config/db";
import { Transaction } from "sequelize";

//? CREATE REPORTS
export const createReport = async (req: Request, res: Response) => {
  const transaction: Transaction = await db.transaction();

  try {
    const { workforce, material, ...reportData } = req.body;

    const newReport = await Report.create(reportData, { transaction });
    for (const wf of workforce) {
      await Workforce.create(
        { ...wf, reportID: newReport.id },
        { transaction }
      );
    }
    for (const mt of material) {
      await Material.create({ ...mt, reportID: newReport.id }, { transaction });
    }

    await transaction.commit();

    const fullReport = await Report.findByPk(newReport.id, {
      include: [{ model: Workforce }, { model: Material }],
    });
    res.status(201).json({ data: fullReport });
  } catch (error) {
    transaction.rollback();
    console.error("Error al crear el reporte:", error.message);
    const err = new Error("Error al crear el reporte");
    res.status(500).json({ error: err.message });
  }
};

//! NOTA:
//? Utilizamos "TRASACTION" para asegurar que todas las operaciones de creación
//? (crear Report, Workforce, y Material) se realicen de manera atómica. Esto significa
//? que si una de las operaciones falla, todas las operaciones se revertirán,
//? asegurando la integridad de los datos.
//? Si cae en el rollback eso deshace las operaciones de la bbdd hechas arriba.

//? GET REPORTS
export const getReports = async (req: Request, res: Response) => {
  try {
    const reports = await Report.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Workforce,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Material,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
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
      include: [
        {
          model: Workforce,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Material,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
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
  const { workforce, material, ...reportData } = req.body;

  const transaction: Transaction = await db.transaction();

  try {
    const report = await Report.findByPk(reportId);
    if (!report) {
      await transaction.rollback();

      console.error("Reporte no encontrado por parámetro inválido");
      return res
        .status(404)
        .json({ error: "Reporte no encontrado por parámetro inválido" });
    }
    await report.update(reportData, { transaction });

    await Workforce.destroy({ where: { reportID: reportId }, transaction });
    for (const wf of workforce) {
      await Workforce.create({ ...wf, reportID: reportId }, { transaction });
    }
    await Material.destroy({ where: { reportID: reportId }, transaction });
    for (const mt of material) {
      await Material.create({ ...mt, reportID: reportId }, { transaction });
    }
    await transaction.commit();

    const updatedReport = await Report.findByPk(reportId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Workforce,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Material,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });

    res.status(200).json({ data: updatedReport });
  } catch (error) {
    await transaction.rollback();
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

    await report.update({ processed: true });

    const updatedReport = await Report.findByPk(reportId, {
      include: [{ model: Workforce }, { model: Material }],
    });

    res.status(200).json({ data: updatedReport });
  } catch (error) {
    console.error("Error al actualizar el reporte:", error.message);
    res.status(500).json({ error: "Error al actualizar el reporte" });
  }
};

//? DELETE REPORT

export const deleteReport = async (req: Request, res: Response) => {
  const reportId = req.params.id; // Obtener el ID del reporte desde los parámetros de la solicitud
  const transaction = await db.transaction();

  try {
    const report = await Report.findByPk(reportId);

    if (!report) {
      await transaction.rollback();
      res
        .status(404)
        .json({ error: "Reporte no encontrado por parámetro inválido" });
      console.error("Reporte no encontrado por parámetro inválido");
      return;
    }

    await Workforce.destroy({ where: { reportID: reportId }, transaction });
    await Material.destroy({ where: { reportID: reportId }, transaction });
    await report.destroy({ transaction });

    await transaction.commit();
    res.status(200).json({
      data: "Reporte y registros asociados eliminados correctamente",
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error al eliminar el reporte:", error.message);
    res.status(500).json({ error: "Error al eliminar el reporte" });
  }
};
