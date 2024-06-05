import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Workforce from "./Worforce.model";
import Material from "./Material.model";

@Table({
  tableName: "reports",
  schema: "public",
})
class Report extends Model<Report> {
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  visitDate!: Date;

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
  })
  nit!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ref!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address!: string;

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
    type: DataType.DATE,
    allowNull: false,
  })
  dueDate!: Date;

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
}

export default Report;
