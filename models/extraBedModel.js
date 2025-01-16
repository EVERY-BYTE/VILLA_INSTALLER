"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtraBedModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const bookingModel_1 = require("./bookingModel");
const zygote_1 = require("./zygote");
exports.ExtraBedModel = index_1.sequelize.define('extraBeds', {
    ...zygote_1.ZygoteModel,
    extraBedId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    extraBedBookingId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    extraBedPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    extraBedQuantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'extra_beds',
    timestamps: false,
    underscored: true,
    freezeTableName: true
});
bookingModel_1.BookingModel.hasMany(exports.ExtraBedModel, { foreignKey: 'extraBedBookingId' });
exports.ExtraBedModel.belongsTo(bookingModel_1.BookingModel, { foreignKey: 'extraBedBookingId' });
