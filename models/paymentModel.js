"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const bookingModel_1 = require("./bookingModel");
const zygote_1 = require("./zygote");
exports.PaymentModel = index_1.sequelize.define('payments', {
    ...zygote_1.ZygoteModel,
    paymentId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    paymentBookingId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    paymentSchema: {
        type: sequelize_1.DataTypes.ENUM('downPayment', 'repayment', 'payInCash'),
        allowNull: false
    },
    paymentPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    paymentMethod: {
        type: sequelize_1.DataTypes.ENUM('cash', 'transfer'),
        allowNull: false
    }
}, {
    tableName: 'payments',
    timestamps: false,
    underscored: true,
    freezeTableName: true
});
bookingModel_1.BookingModel.hasMany(exports.PaymentModel, { foreignKey: 'paymentBookingId' });
exports.PaymentModel.belongsTo(bookingModel_1.BookingModel, { foreignKey: 'paymentBookingId' });
