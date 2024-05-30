import { Table, Column, Model, DataType, HasMany, AllowNull } from "sequelize-typescript";
import Workforce from "./Worforce.model";
import Material from "./Material.model";


@Table({
  tableName: "reports",
})
class Report extends Model<Report> {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  visitDate!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  customerName!: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false
  })
  nit!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  city!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  address!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  phoneNumber!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  dueDate!: string;

  @Column({
    type: DataType.ENUM('low', 'medium', 'high'),
    allowNull: false
  })
  priority!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description!: string;

  @HasMany(() => Workforce)
  workforce!: Workforce[];

  @HasMany(() => Material)
  materials!: Material[];

 
}

export default Report