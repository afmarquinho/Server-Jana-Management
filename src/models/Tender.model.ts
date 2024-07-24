import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
  Default,
} from "sequelize-typescript";
import Report from "./Report.model";

@Table({ tableName: "tenders" })
class Tender extends Model {
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  tender: string;

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
  contactName: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  phoneNumber: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  customerCity: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  createdBy: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  reviewedBy: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  date: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  leadTime: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  paymentMethod: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  proposalValidity: string;

  @Default([])
  @Column({
    type: DataType.ARRAY(DataType.JSON),
    allowNull: true,
  })
  description: {
    item: string;
    description: string;
    unit: string;
    quantity: number;
    unitValue: number;
    totalValue: number;
  }[];

  @Default([])
  @Column({
    type: DataType.ARRAY(DataType.JSON),
    allowNull: true,
  })
  workforce: {
    role: string;
    workers: number;
    rate: number;
    workshift: number;
    profit: number;
    profitAmount: number;
  }[];

  @Default([])
  @Column({
    type: DataType.ARRAY(DataType.JSON),
    allowNull: true,
  })
  material: {
    material: string;
    unit: string;
    quantity: number;
    unitCost: number;
    totalCost: number;
  }[];

  @Default([])
  @Column({
    type: DataType.ARRAY(DataType.JSON),
    allowNull: true,
  })
  notes: string[];

  @Column({
    type: DataType.ENUM,
    values: ["draft", "review", "approved", "rejected", "submitted"],
    allowNull: false,
    defaultValue: "draft",
  })
  status: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ref: string;

  @ForeignKey(() => Report)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  reportId: number;

  @BelongsTo(() => Report)
  report: Report;
}

export default Tender;
