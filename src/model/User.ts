import { Column, DataType, Model, Table } from "sequelize-typescript";

// 🧱 users
@Table({
  tableName: "users",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export default class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password_hash!: string;


  @Column({
    type: DataType.ENUM("active", "inactive", "banned"),
    allowNull: false,
    defaultValue: "active",
  })
  status!: "active" | "inactive" | "banned";

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  created_at!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updated_at!: Date;
}