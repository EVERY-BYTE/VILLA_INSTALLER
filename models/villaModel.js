"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VillaModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const zygote_1 = require("./zygote");
exports.VillaModel = index_1.sequelize.define('villas', {
    ...zygote_1.ZygoteModel,
    villaId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    villaOwnerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    villaName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    villaDescription: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    villaAddress: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    villaBedCapacity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    villaPrice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    villaPriceFee: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true
    }
}, {
    tableName: 'villas',
    timestamps: false,
    underscored: true,
    freezeTableName: true
});
