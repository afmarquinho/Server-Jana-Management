import { Request, Response } from "express";
import Report from "../models/Report.model";
import Tender from "../models/Tender.model";
import { Transaction } from "sequelize";
import db from "../config/db";

//? CREATE TENDER
export const createTender = async (req: Request, res: Response) => {
  const tenderData = req.body;
  const transaction: Transaction = await db.transaction();
  try {
    const newTender = await Tender.create(tenderData, { transaction });
    const report = await Report.findByPk(tenderData.reportId);

    if (!report) {
      console.error("Report no encontrado");
      return res.status(404).json({ error: "Reporte no encontrado" });
    }

    await report.update({ tenderID: newTender.id }, { transaction });

    await transaction.commit();

    const fullTender = await Tender.findByPk(newTender.id, {
      include: [{ model: Report }],
    });

    res.status(201).json({ data: fullTender });
  } catch (error) {
    await transaction.rollback();
    console.error("Error al crear la cotización:", error.message);
    res.status(500).json({ error: "Error al crear la cotización" });
  }
};

//! NOTA: PARA CASOS EN QUE INTERACTUÉ CON VARIAS BASES DE DATOS DESDE UNA FUNCIÓIN
//? Utilizamos "TRASACTION" para asegurar que todas las operaciones de creación
//? (crear Report, Workforce, y Material) se realicen de manera atómica. Esto significa
//? que si una de las operaciones falla, todas las operaciones se revertirán,
//? asegurando la integridad de los datos.
//? Si cae en el rollback eso deshace las operaciones de la bbdd hechas arriba.

//? GET TENDERS
export const getTenders = async (req: Request, res: Response) => {
  try {
    const tenders = await Tender.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (tenders.length === 0) {
      console.error("No se encontraron cotizaciones");
      return res.status(404).json({ error: "No se encontraron cotizaciones" });
    }
    res.status(200).json({ data: tenders });
  } catch (error) {
    console.error("Error al obtener cotizaciones", error.message);
    const err = new Error("Error al obtener cotizaciones");
    res.status(500).json({ error: err.message });
  }
};

//?GET TENDER
export const getTender = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const tender = await Tender.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        { model: Report, attributes: { exclude: ["createdAt", "updatedAt"] } },
      ],
    });
    if (!tender) {
      res
        .status(404)
        .json({ error: "Cotización no encontrada por parámetro inválido" });
      console.error("Cotización no encontrada por parámetro inválido");
      return;
    }
    res.status(200).json({ data: tender });
  } catch (error) {
    console.error("Error al obtener cotización", error.message);
    const err = new Error("Error al obtener cotización");
    res.status(500).json({ error: err.message });
  }
};

//? UPDATE TENDER BY ID
export const updateTender = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tenderData = req.body;
  try {
    const tender = await Tender.findByPk(id);
    if (!tender) {
      res
        .status(404)
        .json({ error: "Cotización no encontrada por parámetro inválido" });
      console.error("Cotización no encontrada por parámetro inválido");
      return;
    }
    const updatedTender = await tender.update(tenderData);
    res.status(200).json({ data: updatedTender });
  } catch (error) {
    console.error("Error al actualizar la cotización:", error.message);
    const err = new Error("Error al actualizar la cotización");
    res.status(500).json({ error: err.message });
  }
};

//? DELETE TENDER
export const deleteTender = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    //* Find tender by ID
    const tender = await Tender.findByPk(id);
    if (!tender) {
      console.error("Cotización no encontrada por parámetro inválido");
      return res.status(404).json({ error: "Cotización no encontrada" });
    }

    //* Find the report linked tender
    const report = await Report.findOne({ where: { tenderID: id } });
    if (!report) {
      console.error("Reporte no encontrado");
      return res.status(404).json({ error: "Reporte no encontrado" });
    }

    //* Update the report to unlike the tender
    await report.update({ tenderID: null });

    //* Delete the tender
    await tender.destroy();

    //* successful answer
    res.status(200).json({ data: "Cotización eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la cotización:", error.message);
    res.status(500).json({ error: "Error al eliminar la cotización" });
  }
};
