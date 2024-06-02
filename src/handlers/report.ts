import { Request, Response } from "express";
import Report from "../models/Report.model";
import Material from "../models/Material.model";
import Workforce from "../models/Worforce.model";
import db from "../config/db";
import { check, validationResult } from "express-validator";
import { PrimaryKey } from "sequelize-typescript";

//? CREATE REPORTS
export const createReport = async (req: Request, res: Response) => {
  const transaction = await db.transaction();

  const { workforce, materials, ...reportData } = req.body;

  // TODO: CAMBIAR EL TIPO DE DATOS DE VISIT DATE DE STRING A DATE Y VALIDAR CON FORMATO DATE

  //? VALIDATIONS

  try {
    const newReport = await Report.create(reportData, { transaction });

    // ? CREATE WORKFORCE AT DB
    if (workforce && workforce.length > 0) {
      for (const wf of workforce) {
        await Workforce.create(
          { ...wf, reportID: newReport.id },
          { transaction }
        );
      }
    }

    // ? CREATE MATERIALS ST DB
    if (materials && materials.length > 0) {
      for (const material of materials) {
        await Material.create(
          { ...material, reportID: newReport.id },
          { transaction }
        );
      }
    }
    transaction.commit();

    const fullReport = await Report.findByPk(newReport.id, {
      include: [{ model: Workforce }, { model: Material }],
    });

    res.status(201).json({ data: fullReport });
  } catch (error) {
    transaction.rollback();
    res.status(500).json({ error: error.message });
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
      include: [{ model: Workforce }, { model: Material }],
    });
    res.status(200).json({ data: reports });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//? GET REPORT BY ID
export const getReportbyId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const report = await Report.findByPk(id, {
      include: [{ model: Workforce }, { model: Material }],
    });
    if (!report) {
      return res.status(404).json({ error: "Reporte no encontrado" });
    }
    res.status(200).json({ data: report });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//? UPDATE REPORT BY ID
export const updateReport = async (req: Request, res: Response) => {
  const transaction = await db.transaction();

  const { id } = req.params;
  const { workforce, materials, ...reportData } = req.body;

  try {
    const report = await Report.findByPk(id, { transaction });
    if (!report) {
      await transaction.rollback();
      return res.status(404).json({ error: "Reporte no encontrado" });
    }

    await report.update(reportData, { transaction });

    //? UPDATE WORKFORCE
    if (workforce && workforce.length > 0) {
      //? DELETE ALL RELATED ROWS WITH THIS REPORT BEFORE INSERTING THE WORKFORCE
      await Workforce.destroy({ where: { reportID: id }, transaction });
      for (const wf of workforce) {
        await Workforce.create({ ...wf, reportID: id }, { transaction });
      }
    }

    //? UPDATE MATERIALS
    if (materials && materials.length > 0) {
      //? DELETE ALL RELATED ROWS WITH THIS REPORT BEFORE INSERTING NEW MATERIALS
      await Material.destroy({ where: { reportID: id }, transaction });
      for (const material of materials) {
        await Material.create({ ...material, reportID: id }, { transaction });
      }
    }

    await transaction.commit();

    const updatedReport = await Report.findByPk(id, {
      include: [{ model: Workforce }, { model: Material }],
    });

    res.status(200).json({ data: updatedReport });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};

//? DELETE REPORT

export const deleteReport = async (req: Request, res: Response) => {
  const transaction = await db.transaction();
  const { id } = req.params;

  try {
    //? MAKE SURE THE REPORT EXISTS
    const report = await Report.findByPk(id, { transaction });
    if (!report) {
      await transaction.rollback();
      return res.status(404).json({ error: "Reporte no encontrado" });
    }
    //? DELETE ALL RELATED MATERIALS
    await Material.destroy({ where: { reportID: id }, transaction });
    //? DELETE ALL RELATED WORKFORCE
    await Workforce.destroy({ where: { reportID: id }, transaction });
    //? DELETE THE REPORT
    await report.destroy();
    await transaction.commit();

    res.status(200).json({ message: 'Reporte, materiales y mano de Obra eliminada exitosamente' });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};
