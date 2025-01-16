"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const villaModel_1 = require("./villaModel");
const zygote_1 = require("./zygote");
exports.BookingModel = index_1.sequelize.define('bookings', {
    ...zygote_1.ZygoteModel,
    bookingId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    bookingAgencyId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    bookingOwnerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    bookingVillaId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    bookingName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    bookingContact: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    bookingStartDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    bookingEndDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    bookingPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    bookingTotalPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    bookingPriceFee: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'bookings',
    timestamps: false,
    underscored: true,
    freezeTableName: true
});
exports.BookingModel.belongsTo(villaModel_1.VillaModel, { foreignKey: 'bookingVillaId' });
