import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  HasMany,
  HasOne,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Tender from "./Tender.model";
import User from "./User.model";

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

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @HasOne(() => Tender)
  tender: Tender;

  @BelongsTo(() => User)
  user: User;
}




export default Report;
