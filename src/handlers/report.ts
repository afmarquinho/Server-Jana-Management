import { Request, Response } from "express";
import Report from "../models/Report.model";
import Material from "../models/Material.model";
import Workforce from "../models/Worforce.model";
import db from "../config/db";
import { check, validationResult } from "express-validator";

export const createReport = async (req: Request, res: Response) => {
  const transaction = await db.transaction();

  const { workforce, materials, ...reportData } = req.body;

// TODO: CAMBIAR EL TIPO DE DATOS DE VISIT DATE DE STRING A DATE Y VALIDAR CON FORMATO DATE

  //? VALIDATIONS

  try {
    const newReport = await Report.create(reportData, { transaction });

    // ? CREATE FORKFORCE AT DB
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
//? Utilizamos una transacción para asegurar que todas las operaciones de creación
//? (crear Report, Workforce, y Material) se realicen de manera atómica. Esto significa
//? que si una de las operaciones falla, todas las operaciones se revertirán,
//? asegurando la integridad de los datos.
//? Si cae en el rollback eso deshace las operaciones de la bbdd hechas arriba.
