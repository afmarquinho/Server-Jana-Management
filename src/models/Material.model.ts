  import {
    Column,
    DataType,
    Table,
    ForeignKey,
    Model,
    BelongsTo,
  } from "sequelize-typescript";
  import Report from "./Report.model";

@Table({
  tableName: "materials",
})
class Material extends Model<Material> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  material: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  unit: string;

  @ForeignKey(() => Report)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  reportID: number;

  @BelongsTo(() => Report)
  report: Report;
}

  export default Material;
