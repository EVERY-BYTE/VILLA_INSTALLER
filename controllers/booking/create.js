"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const bookingModel_1 = require("../../models/bookingModel");
const bookingSchema_1 = require("../../schemas/bookingSchema");
const logger_1 = __importDefault(require("../../utilities/logger"));
const cateringModel_1 = require("../../models/cateringModel");
const extraBedModel_1 = require("../../models/extraBedModel");
const models_1 = require("../../models");
const paymentModel_1 = require("../../models/paymentModel");
const sequelize_1 = require("sequelize");
const create = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(bookingSchema_1.createBookingSchema, req.body);
    if (error) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const existingBooking = await bookingModel_1.BookingModel.findOne({
            where: {
                bookingVillaId: value.bookingVillaId,
                [sequelize_1.Op.or]: [
                    {
                        bookingStartDate: {
                            [sequelize_1.Op.between]: [value.bookingStartDate, value.bookingEndDate]
                        }
                    },
                    {
                        bookingEndDate: {
                            [sequelize_1.Op.between]: [value.bookingStartDate, value.bookingEndDate]
                        }
                    },
                    {
                        bookingStartDate: {
                            [sequelize_1.Op.lte]: value.bookingStartDate
                        },
                        bookingEndDate: {
                            [sequelize_1.Op.gte]: value.bookingEndDate
                        }
                    }
                ]
            }
        });
        if (existingBooking) {
            const message = `Villa yang dipilih sudah dipesan pada rentang tanggal yang ditentukan.`;
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.CONFLICT).json(response_1.ResponseData.error(message));
        }
        const transaction = await models_1.sequelize.transaction();
        try {
            const booking = await bookingModel_1.BookingModel.create({ ...value, bookingAgencyId: req.body.jwtPayload.userId }, { transaction });
            if (value.caterings) {
                const cateringData = value.caterings.map((catering) => ({
                    ...catering,
                    cateringBookingId: booking.bookingId
                }));
                await cateringModel_1.CateringModel.bulkCreate(cateringData, { transaction });
            }
            if (value.extraBeds) {
                const extraBedsData = value.extraBeds.map((extraBed) => ({
                    ...extraBed,
                    extraBedBookingId: booking.bookingId
                }));
                await extraBedModel_1.ExtraBedModel.bulkCreate(extraBedsData, { transaction });
            }
            if (value.payments) {
                const paymentsData = value.payments.map((payment) => ({
                    ...payment,
                    paymentBookingId: booking.bookingId
                }));
                await paymentModel_1.PaymentModel.bulkCreate(paymentsData, { transaction });
            }
            await transaction.commit();
            const response = response_1.ResponseData.success(booking);
            logger_1.default.info('Booking created successfully');
            return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.create = create;
