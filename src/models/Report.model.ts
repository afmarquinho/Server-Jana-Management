import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Workforce from "./Worforce.model";
import Material from "./Material.model";
import { defaultValueSchemable } from "sequelize/lib/utils";

// TODO: REVISAR QUE LLENE DE NULL LOS CAMPOS DE NIT Y ADDRESS CUANDO NO VENGAN
// TODO: REVISAR LOS PUBLIC CLASS PARA QUE NO SALGA EL MENSAJE DEL WARNING AL HACER EL POST DE UN REPORTE
@Table({
  tableName: "reports",
})
class Report extends Model<Report> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  customerName!: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    defaultValue: null,
  })
  nit!: number | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  address!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  contactName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phoneNumber!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.ENUM("low", "medium", "high"),
    allowNull: false,
  })
  priority!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @HasMany(() => Workforce)
  workforce!: Workforce[];

  @HasMany(() => Material)
  material!: Material[];

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  processed!: boolean;

  @Column({
    type: DataType.INET,
    allowNull: true,
    defaultValue: null,
  })
  tenderID!: number | null;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  visitDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dueDate!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ref!: string;
}

export default Report;
