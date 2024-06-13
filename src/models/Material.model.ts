  import {
    Column,
    DataType,
    Table,
    ForeignKey,
    Model,
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
  amount: number;

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
}

  export default Material;
