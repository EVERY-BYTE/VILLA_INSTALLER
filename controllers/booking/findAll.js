"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const bookingModel_1 = require("../../models/bookingModel");
const bookingSchema_1 = require("../../schemas/bookingSchema");
const logger_1 = __importDefault(require("../../utilities/logger"));
const pagination_1 = require("../../utilities/pagination");
const sequelize_1 = require("sequelize");
const extraBedModel_1 = require("../../models/extraBedModel");
const cateringModel_1 = require("../../models/cateringModel");
const paymentModel_1 = require("../../models/paymentModel");
const villaModel_1 = require("../../models/villaModel");
const findAll = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(bookingSchema_1.findAllBookingsSchema, req.query);
    if (error) {
        const message = `Invalid request query! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const { page: queryPage, size: querySize, search, pagination } = value;
        const page = new pagination_1.Pagination(parseInt(queryPage) ?? 0, parseInt(querySize) ?? 10);
        logger_1.default.debug('Pagination:', page);
        logger_1.default.debug('Pagination flag:', pagination);
        const result = await bookingModel_1.BookingModel.findAndCountAll({
            where: {
                deleted: 0,
                ...(Boolean(search) && {
                    bookingName: { [sequelize_1.Op.like]: `%${search}%` },
                    bookingContact: { [sequelize_1.Op.like]: `%${search}%` }
                }),
                ...(Boolean(req.body?.jwtPayload?.userRole === 'Owner') && {
                    bookingOwnerId: req.body?.jwtPayload?.userId
                }),
                ...(Boolean(req.body?.jwtPayload?.userRole === 'Agency' ||
                    req.body?.jwtPayload?.userRole === 'Marketing') && {
                    bookingAgencyId: req.body?.jwtPayload?.userId
                })
            },
            distinct: true,
            include: [
                {
                    model: paymentModel_1.PaymentModel
                },
                {
                    model: extraBedModel_1.ExtraBedModel
                },
                {
                    model: cateringModel_1.CateringModel
                },
                {
                    model: villaModel_1.VillaModel
                }
            ],
            order: [['bookingId', 'desc']],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success(result);
        response.data = page.formatData(result);
        logger_1.default.info('Bookings retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findAll = findAll;
