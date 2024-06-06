import {
  Column,
  Table,
  Model,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import Report from "./Report.model";

@Table({
  tableName: "workforces",
})
class Workforce extends Model<Workforce> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  workforce!: string;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  workshift!: number;

  @ForeignKey(() => Report)
  @Column({ type: DataType.INTEGER, allowNull: false })
  reportID: number;

  
}

export default Workforce;
