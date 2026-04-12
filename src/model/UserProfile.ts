// 🪪 user_profiles

import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "user_profiles",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export default class UserProfile extends Model {
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
    type: DataType.STRING,
    allowNull: false,
  })
  first_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name!: string;

  @Column({
    type: DataType.ENUM("male", "female", "other"),
    allowNull: false,
  })
  gender!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dob!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bio!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  profilePicture!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  city!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  state!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  country!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  zipCode!: string;
}
