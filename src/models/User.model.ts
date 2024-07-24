import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.ENUM('cc', 'passport', 'ce'),
    allowNull: false,
  })
  idType: string;
  
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  ID: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dateOfBirth: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phoneNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.ENUM('gerente', 'ing cotizacion', 'ing obra', 'administrador'),
    allowNull: false,
  })
  rol: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  user: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string; // Asegúrate de que password esté definido correctamente como STRING

 }

export default User;
