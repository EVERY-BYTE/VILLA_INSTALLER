"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const bookingModel_1 = require("../../models/bookingModel");
const bookingSchema_1 = require("../../schemas/bookingSchema");
const logger_1 = __importDefault(require("../../utilities/logger"));
const cateringModel_1 = require("../../models/cateringModel");
const extraBedModel_1 = require("../../models/extraBedModel");
const paymentModel_1 = require("../../models/paymentModel");
const villaModel_1 = require("../../models/villaModel");
const findOne = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(bookingSchema_1.findBookingSchema, req.params);
    if (error) {
        const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const result = await bookingModel_1.BookingModel.findOne({
            where: {
                deleted: 0,
                bookingId: value.bookingId
            },
            include: [
                {
                    model: paymentModel_1.PaymentModel,
                    attributes: ['paymentId', 'paymentSchema', 'paymentPrice', 'paymentMethod']
                },
                {
                    model: extraBedModel_1.ExtraBedModel,
                    attributes: ['extraBedId', 'extraBedPrice', 'extraBedQuantity']
                },
                {
                    model: cateringModel_1.CateringModel,
                    attributes: ['cateringId', 'cateringPrice', 'cateringQuantity']
                },
                {
                    model: villaModel_1.VillaModel
                }
            ],
            attributes: [
                'bookingId',
                'bookingName',
                'bookingContact',
                'bookingVillaId',
                'bookingStartDate',
                'bookingAgencyId',
                'bookingEndDate',
                'bookingPrice',
                'bookingTotalPrice'
            ]
        });
        if (!result) {
            const message = `Booking record not found with ID: ${value.bookingId}`;
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        const response = response_1.ResponseData.success(result);
        logger_1.default.info('Booking record found successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findOne = findOne;
