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

  @Default(null)
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
  
  @Default(null)
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  reviewedBy: string;

  @Default(null)
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  date: Date;

  @Default(null)
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  leadTime: string;

  @Default(null)
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  paymentMethod: string;

  @Default(null)
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
    shiftType: string;
    rate: number;
    shiftCount: number;
    partialCost: number;
    profit: number;
    profitAmount: number;
    totalValue: number;
  }[];

  @Default([])
  @Column({
    type: DataType.ARRAY(DataType.JSON),
    allowNull: true,
  })
  materials: {
    description: string;
    unit: string;
    quantity: number;
    unitCost: number;
    partialCost: number;
    profit: number;
    profitAmount: number;
    totalValue: number;
  }[];

  @Default([])
  @Column({
    type: DataType.ARRAY(DataType.JSON),
    allowNull: true,
  })
  otherExpenses: {
    description: string;
  shiftType: string;
  unit: string;
  amount: number;
  unitCost: number;
  partialCost: number;
  profit: number;
  profitAmount: number;
  totalValue: number;
  }[];
  
  @Default({})
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  summary: {
    materials: number;
    preparation: number;
    day: number;
    night: number;
    total:number
  };

  @Default([])
  @Column({
    type: DataType.ARRAY(DataType.JSON),
    allowNull: true,
  })
  notes: string[];

  @Default("draft")
  @Column({
    type: DataType.ENUM,
    values: ["draft", "review", "approved", "rejected", "submitted"],
    allowNull: false,
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
