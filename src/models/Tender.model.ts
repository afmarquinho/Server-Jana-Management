import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from "sequelize-typescript";
import Report from "./Report.model";

@Table({ tableName: "tenders" })
class Tender extends Model {
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
  customerCity: string;

  @Column({
    type: DataType.ARRAY(DataType.JSON),
    allowNull: false,
  })
  description: {
    description: string;
    unit: string;
    quantity: number;
    unitValue: number;
    totalValue: number;
  }[];

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
