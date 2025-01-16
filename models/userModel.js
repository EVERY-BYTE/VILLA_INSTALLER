"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const zygote_1 = require("./zygote");
exports.UserModel = index_1.sequelize.define('users', {
    ...zygote_1.ZygoteModel,
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    userPassword: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    userRole: {
        type: sequelize_1.DataTypes.ENUM('SuperxAdmin', 'Finance', 'Owner', 'Admin', 'Agency', 'Marketing'),
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: false,
    underscored: true,
    freezeTableName: true
});
