// 🔐 user_sessions
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "user_sessions",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export default class UserSession extends Model {
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
    type: DataType.TEXT,
    allowNull: false,
  })
  token!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expires_at!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  user_agent!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ip_address!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  created_at!: Date;
}
