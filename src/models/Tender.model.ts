import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
  Default,
  HasOne,
} from "sequelize-typescript";
import Report from "./Report.model";
import Consecutive from "./Consecutive.model";


@Table({ tableName: "tenders" })
class Tender extends Model {

  @Default(null)
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  code: string;

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

  @Default(null)
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
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
  workforces: {
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

  @Default({
    materials: 0,
    preparation: 0,
    day: 0,
    night: 0,
    total: 0,
  })
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  summary: {
    materials: number;
    preparation: number;
    day: number;
    night: number;
    total: number;
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

  @Default([])
  @Column({
    type: DataType.ARRAY(DataType.JSON),
    allowNull: true,
  })
  comments: [
    {
      author: string;
      comment: string;
    }
  ];

  @ForeignKey(() => Report)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  reportId: number;

  @Default(0)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rev: number;

  @BelongsTo(() => Report)
  report: Report;

  @HasOne(() => Consecutive)
  consecutive: Consecutive;
  
}

export default Tender;
