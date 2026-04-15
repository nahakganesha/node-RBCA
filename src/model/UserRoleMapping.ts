// 🔗 user_role_mapping
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "user_role_mappings",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export default class UserRoleMapping extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  role_id!: number;
}
