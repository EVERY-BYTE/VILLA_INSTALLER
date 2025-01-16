"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBookingSchema = exports.findAllBookingsSchema = exports.findBookingSchema = exports.updateBookingSchema = exports.createBookingSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.createBookingSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    bookingVillaId: joi_1.default.number().integer().positive().required(),
    bookingAgencyId: joi_1.default.number().integer().positive(),
    bookingOwnerId: joi_1.default.number().integer().positive().required(),
    bookingName: joi_1.default.string().min(3).max(255).required(),
    bookingContact: joi_1.default.string().min(3).max(255).required(),
    bookingStartDate: joi_1.default.date().iso().required(),
    bookingEndDate: joi_1.default.date().iso().greater(joi_1.default.ref('bookingStartDate')).required(),
    bookingPrice: joi_1.default.number().positive().required(),
    bookingTotalPrice: joi_1.default.number().positive().required(),
    bookingPriceFee: joi_1.default.number().positive().optional().allow(''),
    caterings: joi_1.default.array()
        .items(joi_1.default.object({
        cateringQuantity: joi_1.default.number().integer().positive().required(),
        cateringPrice: joi_1.default.number().positive().required()
    }))
        .optional(),
    extraBeds: joi_1.default.array()
        .items(joi_1.default.object({
        extraBedPrice: joi_1.default.number().positive().required(),
        extraBedQuantity: joi_1.default.number().optional()
    }))
        .optional(),
    payments: joi_1.default.array()
        .items(joi_1.default.object({
        paymentSchema: joi_1.default.string()
            .valid('downPayment', 'repayment', 'payInCash')
            .required(),
        paymentPrice: joi_1.default.number().positive().required(),
        paymentMethod: joi_1.default.string().valid('cash', 'transfer').required()
    }))
        .optional()
});
exports.updateBookingSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    bookingId: joi_1.default.number().integer().positive().required(),
    bookingOwnerId: joi_1.default.number().integer().positive().optional(),
    bookingVillaId: joi_1.default.number().integer().positive().optional(),
    bookingAgencyId: joi_1.default.number().integer().positive().optional(),
    bookingName: joi_1.default.string().min(3).max(255).optional(),
    bookingContact: joi_1.default.string().min(3).max(255).optional(),
    bookingStartDate: joi_1.default.date().iso().optional(),
    bookingEndDate: joi_1.default.date().iso().greater(joi_1.default.ref('bookingStartDate')).optional(),
    bookingPrice: joi_1.default.number().positive().optional(),
    bookingTotalPrice: joi_1.default.number().positive().required(),
    bookingPriceFee: joi_1.default.number().positive().optional().allow(''),
    caterings: joi_1.default.array()
        .items(joi_1.default.object({
        cateringId: joi_1.default.number().integer().positive().optional().allow(''),
        cateringQuantity: joi_1.default.number().integer().positive().optional(),
        cateringPrice: joi_1.default.number().positive().optional()
    }))
        .optional(),
    extraBeds: joi_1.default.array()
        .items(joi_1.default.object({
        extraBedId: joi_1.default.number().integer().positive().optional().allow(''), // Required to update a specific extra bed item
        extraBedPrice: joi_1.default.number().positive().optional(),
        extraBedQuantity: joi_1.default.number().optional()
    }))
        .optional(),
    payments: joi_1.default.array()
        .items(joi_1.default.object({
        paymentId: joi_1.default.number().integer().positive().optional().allow(''),
        paymentSchema: joi_1.default.string()
            .valid('downPayment', 'repayment', 'payInCash')
            .optional(),
        paymentPrice: joi_1.default.number().positive().optional(),
        paymentMethod: joi_1.default.string().valid('cash', 'transfer').optional()
    }))
        .optional(),
    villa: joi_1.default.any()
});
exports.findBookingSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    bookingId: joi_1.default.number().integer().positive().required()
});
exports.findAllBookingsSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().min(0).default(0).optional(),
    size: joi_1.default.number().integer().min(1).default(10).optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().default(true).optional(),
    filterByVilla: joi_1.default.string().allow('').optional(),
    filterByDayWeekMonthYear: joi_1.default.string().allow('').optional(),
    startDate: joi_1.default.string().allow('').optional(),
    endDate: joi_1.default.string().allow('').optional()
});
exports.removeBookingSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    bookingId: joi_1.default.number().integer().positive().required()
});
