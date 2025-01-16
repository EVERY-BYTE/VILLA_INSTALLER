"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTotal = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const logger_1 = __importDefault(require("../../utilities/logger"));
const bookingModel_1 = require("../../models/bookingModel");
const userModel_1 = require("../../models/userModel");
const cateringModel_1 = require("../../models/cateringModel");
const extraBedModel_1 = require("../../models/extraBedModel");
const villaModel_1 = require("../../models/villaModel");
const getDateRange = (filterByDayWeekMonthYear) => {
    const now = new Date();
    let startDate;
    let endDate = new Date();
    switch (filterByDayWeekMonthYear) {
        case 'day':
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        case 'week':
            startDate = new Date(now);
            startDate.setDate(now.getDate() - now.getDay());
            break;
        case 'month':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case 'year':
            startDate = new Date(now.getFullYear(), 0, 1);
            break;
        default:
            startDate = new Date(0);
    }
    return { startDate, endDate };
};
const findTotal = async (req, res) => {
    try {
        const { filterByPlatform, startDate, endDate, filterByDayWeekMonthYear } = req.query;
        const { startDate: filterStartDate, endDate: filterEndDate } = getDateRange(filterByDayWeekMonthYear ?? '');
        const dateFilter = filterByDayWeekMonthYear
            ? {
                createdAt: {
                    [sequelize_1.Op.between]: [filterStartDate, filterEndDate]
                }
            }
            : startDate && endDate
                ? {
                    createdAt: {
                        [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)]
                    }
                }
                : {};
        const platformFilter = filterByPlatform
            ? {
                salePlatformName: filterByPlatform
            }
            : {};
        const totalSuperAdmin = await userModel_1.UserModel.count({
            where: {
                deleted: 0,
                userRole: 'SuperAdmin'
            }
        });
        const totalAdmin = await userModel_1.UserModel.count({
            where: {
                deleted: 0,
                userRole: 'Admin'
            }
        });
        const totalAgency = await userModel_1.UserModel.count({
            where: {
                deleted: 0,
                userRole: 'Agency'
            }
        });
        const totalOwner = await userModel_1.UserModel.count({
            where: {
                deleted: 0,
                userRole: 'Owner'
            }
        });
        const totalFinance = await userModel_1.UserModel.count({
            where: {
                deleted: 0,
                userRole: 'Finance'
            }
        });
        const totalBooking = await bookingModel_1.BookingModel.count({
            where: {
                deleted: 0,
                ...dateFilter
            }
        });
        const totalCatering = await cateringModel_1.CateringModel.count({
            where: {
                deleted: 0,
                ...dateFilter
            }
        });
        const totalExtraBed = await extraBedModel_1.ExtraBedModel.count({
            where: {
                deleted: 0,
                ...dateFilter
            }
        });
        const totalVilla = await villaModel_1.VillaModel.count({
            where: {
                deleted: 0,
                ...dateFilter
            }
        });
        const response = response_1.ResponseData.success({
            totalSuperAdmin,
            totalAdmin,
            totalFinance,
            totalAgency,
            totalOwner,
            totalBooking,
            totalCatering,
            totalExtraBed,
            totalVilla
        });
        logger_1.default.info('Total statistics retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findTotal = findTotal;
