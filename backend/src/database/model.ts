import { INTEGER,  STRING } from 'sequelize';
import database from "./index";

export const UserTable = database.define('users', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    },
    email: {
        type: STRING,
        allowNull: true,
        unique: true
    },
    access_level: {
        type: STRING,
        allowNull: true
    },
    password: {
        type: STRING,
        allowNull: true
    },
})
