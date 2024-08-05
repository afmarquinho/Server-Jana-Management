import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from "sequelize-typescript";
import Tender from "./Tender.model";

@Table({ tableName: "consecutives" })
class Consecutive extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  counter: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  year: number;

  @ForeignKey(() => Tender)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  tenderId: number;

  @BelongsTo(() => Tender)
  tender: Tender;
}

export default Consecutive;
