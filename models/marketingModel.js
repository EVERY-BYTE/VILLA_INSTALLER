"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const zygote_1 = require("./zygote");
exports.MarketingModel = index_1.sequelize.define('Marketings', {
    ...zygote_1.ZygoteModel,
    marketingId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    marketingName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'marketings',
    timestamps: false,
    underscored: true,
    freezeTableName: true
});
