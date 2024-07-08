import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  HasMany,
  HasOne,
} from "sequelize-typescript";
import Workforce from "./Worforce.model";
import Material from "./Material.model";
import Tender from "./Tender.model";

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
  city: string;

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

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  processed: boolean;

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

  @Default(null)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  tenderID: number | null;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  ref: string;

  @HasMany(() => Workforce)
  workforce: Workforce[];

  @HasMany(() => Material)
  material: Workforce[];

  @HasOne(() => Tender)
  tender: Tender;
}

export default Report;
