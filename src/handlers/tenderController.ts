import { Request, Response } from "express";
import Report from "../models/Report.model";
import Tender from "../models/Tender.model";
import { Transaction } from "sequelize";
import db from "../config/db";
import {
  MaterialReportType,
  Tendertype,

  WorkforceReportType,
} from "../types/types";

//? CREATE TENDER
export const createTender = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tenderId = Number(id);

  let tender: Tendertype = {
    name: "",
    customerName: "",
    contactName: "",
    email: "",
    phoneNumber: "",
    customerCity: "",
    reportId: tenderId,
    ref: "",
    workforces: [],
    materials: [],
    otherExpenses: [],
  };

  const transaction: Transaction = await db.transaction();

  try {
    const report = await Report.findByPk(tenderId);

    if (!report) {
      console.error("Report no encontrado");
      return res.status(404).json({ error: "Reporte no encontrado" });
    }
    if (!report.dataValues.processed) {
      console.error("El reporte debe estar procesado");
      return res.status(400).json({ error: "Reporte no procesado" });
    }

    tender.name = report.dataValues.name;
    tender.customerName = report.dataValues.customerName;
    tender.contactName = report.dataValues.contactName;
    tender.email = report.dataValues.email;
    tender.phoneNumber = report.dataValues.phoneNumber;
    tender.customerCity = report.dataValues.customerCity;
    tender.ref = report.dataValues.ref;
    tender.workforces = report.dataValues.workforces.map(
      (item: WorkforceReportType) => ({
        role: item.role,
        workers: 0,
        shiftType: "day",
        rate: 0,
        shiftCount: item.workshift,
        partialCost: 0,
        profit: 0,
        profitAmount: 0,
        totalValue: 0,
      })
    );

    tender.materials = report.dataValues.materials.map(
      (item: MaterialReportType) => ({
        description: item.material,
        unit: item.unit,
        quantity: item.quantity,
        unitCost: 0,
        partialCost: 0,
        profit: 0,
        profitAmount: 0,
        totalValue: 0,
      })
    );
    const newTender = await Tender.create(tender, {
      transaction,
    });
    await report.update(
      { tenderID: newTender.id },
      { transaction }
    );
    await transaction.commit();

    const tenderRes = await Tender.findByPk(newTender.id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.status(201).json({ data: tenderRes });
  } catch (error) {
    await transaction.rollback();
    console.error("Error al crear la cotización:", error.message);
    res.status(500).json({ error: "Error al crear la cotización" });
  }
};

//? GET TENDERS
export const getTenders = async (req: Request, res: Response) => {
  try {
    const tenders = await Tender.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
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
  const tenderData= req.body;
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
    console.error("Error al actualizar la cotización", error.message);
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

//! NOTA: PARA CASOS EN QUE INTERACTUÉ CON VARIAS BASES DE DATOS DESDE UNA FUNCIÓIN
//? Utilizamos "TRASACTION" para asegurar que todas las operaciones de creación
//? (crear Report, Workforce, y Material) se realicen de manera atómica. Esto significa
//? que si una de las operaciones falla, todas las operaciones se revertirán,
//? asegurando la integridad de los datos.
//? Si cae en el rollback eso deshace las operaciones de la bbdd hechas arriba.
