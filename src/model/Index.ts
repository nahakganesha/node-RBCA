import { Sequelize } from "sequelize-typescript";
import dbConfig from "../config/db.config";
import User from "./User";
import UserProfile from "./UserProfile";
import UserRole from "./UserRole";
import UserRoleMapping from "./UserRoleMapping";

const connection = new Sequelize({
    dialect: "mysql",
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    logging: false,
    models: [User, UserProfile, UserRole, UserRoleMapping],
});

export default connection;
