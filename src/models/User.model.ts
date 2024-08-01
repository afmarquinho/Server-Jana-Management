import { Column, DataType, Default, Model, Table } from 'sequelize-typescript';

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
  userId: number;

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
    type: DataType.ENUM('gerente', 'ingCotizacion', 'ingObra', 'admin'),
    allowNull: false,
  })
  role: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  jobTitle: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  profilePicture: string; 

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  user: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  active: boolean;


 }

export default User;
