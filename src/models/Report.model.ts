import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  HasMany,
  HasOne,
  ForeignKey,
} from "sequelize-typescript";
import Tender from "./Tender.model";


@Table({
  tableName: "reports",
})
class Report extends Model {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  customerName: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  customerCity: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  contactName: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  phoneNumber: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.ENUM("low", "medium", "high"),
    allowNull: false,
  })
  priority: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  visitDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dueDate: Date;

  @ForeignKey(() => Tender)
  @Default(null)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  tenderID: number | null;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  ref: string;

  @Column({
    type: DataType.ARRAY(DataType.JSON),
    allowNull: false,
  })
  workforces: {
    role: string;
    workshift: number;
  }[];

  @Column({
    type: DataType.ARRAY(DataType.JSON),
    allowNull: false,
  })
  materials: {
    material: string;
    quantity: number;
    unit: string;
  }[];

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  processed: boolean;
 
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  createdBy: string;

  @HasOne(() => Tender)
  tender: Tender;
}

export default Report;
