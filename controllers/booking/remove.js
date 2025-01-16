"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const bookingModel_1 = require("../../models/bookingModel");
const bookingSchema_1 = require("../../schemas/bookingSchema");
const logger_1 = __importDefault(require("../../utilities/logger"));
const remove = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(bookingSchema_1.removeBookingSchema, req.params);
    if (error) {
        const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const result = await bookingModel_1.BookingModel.findOne({
            where: {
                bookingId: value.bookingId
            }
        });
        if (!result) {
            const message = `Booking record not found with ID: ${value.bookingId}`;
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        result.deleted = 1;
        await result.save();
        const response = response_1.ResponseData.success({
            message: 'Booking record deleted successfully'
        });
        logger_1.default.info('Booking record deleted successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.remove = remove;
