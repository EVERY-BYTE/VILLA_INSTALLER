"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingReports = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const logger_1 = __importDefault(require("../../utilities/logger"));
const bookingModel_1 = require("../../models/bookingModel");
const extraBedModel_1 = require("../../models/extraBedModel");
const cateringModel_1 = require("../../models/cateringModel");
const reportModel_1 = require("../../models/reportModel");
const response_1 = require("../../utilities/response");
const paymentModel_1 = require("../../models/paymentModel");
const bookingReports = async (req, res) => {
    try {
        const { startDate, endDate, groupBy } = req.query;
        const dateFormat = groupBy === 'week' ? '%Y-%u' : '%Y-%m';
        const whereCondition = {
            deleted: 0,
            ...(startDate && endDate
                ? {
                    createdAt: {
                        [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)]
                    }
                }
                : {})
        };
        const totalBooking = await bookingModel_1.BookingModel.count({
            where: {
                ...whereCondition,
                ...(Boolean(req.body?.jwtPayload?.userRole === 'Owner') && {
                    bookingOwnerId: req.body?.jwtPayload?.userId
                }),
                ...(Boolean(req.body?.jwtPayload?.userRole === 'Agency' ||
                    req.body?.jwtPayload?.userRole === 'Marketing') && {
                    bookingAgencyId: req.body?.jwtPayload?.userId
                })
            }
        });
        const statistics = await bookingModel_1.BookingModel.findAll({
            where: {
                ...whereCondition,
                ...(Boolean(req.body?.jwtPayload?.userRole === 'Owner') && {
                    bookingOwnerId: req.body?.jwtPayload?.userId
                }),
                ...(Boolean(req.body?.jwtPayload?.userRole === 'Agency' ||
                    req.body?.jwtPayload?.userRole === 'Marketing') && {
                    bookingAgencyId: req.body?.jwtPayload?.userId
                })
            },
            attributes: [
                // [Sequelize.fn('DATE_FORMAT', Sequelize.col('created_at'), dateFormat), 'period'],
                [sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('booking_total_price')), 'totalBookingPrice'],
                [sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('booking_price_fee')), 'totalBookingPriceFee']
            ],
            include: [
                {
                    model: extraBedModel_1.ExtraBedModel,
                    attributes: [
                        [
                            sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.literal('extra_bed_price * extra_bed_quantity')),
                            'totalExtraBedPrice'
                        ],
                        [sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('extra_bed_quantity')), 'totalExtraBed']
                    ],
                    where: whereCondition
                },
                {
                    model: cateringModel_1.CateringModel,
                    attributes: [
                        [
                            sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.literal('catering_price * catering_quantity')),
                            'totalCateringPrice'
                        ],
                        [sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('catering_quantity')), 'totalCatering']
                    ],
                    where: whereCondition
                },
                {
                    model: paymentModel_1.PaymentModel
                    // attributes: [
                    //   [
                    //     Sequelize.fn(
                    //       'SUM',
                    //       Sequelize.literal('catering_price * catering_quantity')
                    //     ),
                    //     'totalCateringPrice'
                    //   ],
                    //   [Sequelize.fn('SUM', Sequelize.col('catering_quantity')), 'totalCatering']
                    // ],
                    // where: whereCondition
                }
            ]
            // group: ['period']
        });
        const reportData = await reportModel_1.ReportModel.findAll({
            where: whereCondition,
            attributes: [
                [sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('report_total_amount')), 'totalReportAmount'],
                'reportCategory'
                // [Sequelize.fn('DATE_FORMAT', Sequelize.col('created_at'), dateFormat), 'period']
            ],
            group: ['reportCategory']
        });
        const reportList = await reportModel_1.ReportModel.findAll({
            where: whereCondition
        });
        const combinedStatistics = statistics.map((stat) => {
            const periodReports = reportData.filter((report) => report.period === stat.dataValues.period);
            const reports = periodReports.map((report) => ({
                category: report.reportCategory,
                totalAmount: parseFloat(report.dataValues.totalReportAmount) || 0
            }));
            return {
                ...stat.dataValues,
                reports: reports
            };
        });
        const grandTotal = combinedStatistics.reduce((acc, curr) => {
            const reportsTotal = curr?.reports.reduce((sum, report) => sum + report?.totalAmount, 0);
            return (acc +
                parseFloat(curr?.totalBookingPrice || 0) +
                parseFloat(curr?.totalExtraBedPrice || 0) +
                parseFloat(curr?.totalCateringPrice || 0) +
                parseFloat(curr?.totalBookingPriceFee || 0)
            // reportsTotal
            );
        }, 0);
        logger_1.default.info('Statistics calculated successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_1.ResponseData.success({
            statistic: combinedStatistics[0],
            grandTotal,
            reportList,
            totalBooking
        }));
    }
    catch (error) {
        const message = `Unable to calculate statistics! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.bookingReports = bookingReports;
