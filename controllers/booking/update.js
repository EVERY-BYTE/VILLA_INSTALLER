"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
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
const update = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(bookingSchema_1.updateBookingSchema, req.body);
    if (error) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const transaction = await models_1.sequelize.transaction();
        try {
            const [updated] = await bookingModel_1.BookingModel.update(value, {
                where: {
                    deleted: 0,
                    bookingId: value.bookingId,
                    bookingAgencyId: value.bookingAgencyId
                },
                transaction
            });
            // if (!updated) {
            //   console.log(update)
            //   const message = `Booking record not found with ID: ${value.bookingId}`
            //   logger.warn(message)
            //   await transaction.rollback()
            //   return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
            // }
            // Update or create caterings if provided
            if (value.caterings) {
                await cateringModel_1.CateringModel.destroy({
                    where: { cateringBookingId: value.bookingId },
                    transaction
                });
                const cateringData = value.caterings.map((catering) => ({
                    ...catering,
                    cateringBookingId: value.bookingId
                }));
                await cateringModel_1.CateringModel.bulkCreate(cateringData, { transaction });
            }
            // Update or create extra beds if provided
            if (value.extraBeds) {
                await extraBedModel_1.ExtraBedModel.destroy({
                    where: { extraBedBookingId: value.bookingId },
                    transaction
                });
                const extraBedsData = value.extraBeds.map((extraBed) => ({
                    ...extraBed,
                    extraBedBookingId: value.bookingId
                }));
                await extraBedModel_1.ExtraBedModel.bulkCreate(extraBedsData, { transaction });
            }
            // Update or create payments if provided
            if (value.payments) {
                await paymentModel_1.PaymentModel.destroy({
                    where: { paymentBookingId: value.bookingId },
                    transaction
                });
                const paymentsData = value.payments.map((payment) => ({
                    ...payment,
                    paymentBookingId: value.bookingId
                }));
                await paymentModel_1.PaymentModel.bulkCreate(paymentsData, { transaction });
            }
            await transaction.commit();
            const response = response_1.ResponseData.success({
                message: 'Booking record updated successfully'
            });
            logger_1.default.info('Booking record updated successfully');
            return res.status(http_status_codes_1.StatusCodes.OK).json(response);
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
exports.update = update;
