"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CateringModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const bookingModel_1 = require("./bookingModel");
const zygote_1 = require("./zygote");
exports.CateringModel = index_1.sequelize.define('caterings', {
    ...zygote_1.ZygoteModel,
    cateringId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    cateringBookingId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    cateringQuantity: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    cateringPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'caterings',
    timestamps: false,
    underscored: true,
    freezeTableName: true
});
bookingModel_1.BookingModel.hasMany(exports.CateringModel, { foreignKey: 'cateringBookingId' });
exports.CateringModel.belongsTo(bookingModel_1.BookingModel, { foreignKey: 'cateringBookingId' });
