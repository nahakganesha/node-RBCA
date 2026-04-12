// 🧩 user_roles

import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "user_roles",
  timestamps: false,
})
export default class UserRole extends Model {
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
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description!: string;
}
