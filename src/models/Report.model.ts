import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({
  tableName: "reports",
})
class Report extends Model {
  @Column({
    type: DataType.STRING(100),
  })
  name: string;

  @Column({
    type: DataType.STRING(100),
  })
  customerName: string;

  @Column({
    type: DataType.STRING(100),
  })
  description: string;

  @Column({
    type: DataType.STRING(100),
  })
  priority: string;
}
