"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllReportsSchema = exports.findOneReportSchema = exports.deleteReportSchema = exports.updateReportSchema = exports.createReportSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.createReportSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    reportVillaId: joi_1.default.number().integer().positive().required(),
    reportName: joi_1.default.string().max(255).required(),
    reportTotalAmount: joi_1.default.number().precision(2).required(),
    reportDescription: joi_1.default.string().allow('').optional(),
    reportCategory: joi_1.default.string().valid('income', 'spend').required()
});
exports.updateReportSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    reportId: joi_1.default.number().integer().positive().required(),
    reportVillaId: joi_1.default.number().integer().positive().optional(),
    reportName: joi_1.default.string().max(255).optional(),
    reportTotalAmount: joi_1.default.number().precision(2).optional(),
    reportDescription: joi_1.default.string().allow('').optional(),
    reportCategory: joi_1.default.string().valid('income', 'spend').required(),
    updatedAt: joi_1.default.date().optional()
});
exports.deleteReportSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    reportId: joi_1.default.number().integer().positive().required()
});
exports.findOneReportSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    reportId: joi_1.default.number().integer().positive().required()
});
exports.findAllReportsSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional(),
    filterByVilla: joi_1.default.string().allow('').optional(),
    filterByDayWeekMonthYear: joi_1.default.string().allow('').optional(),
    startDate: joi_1.default.string().allow('').optional(),
    endDate: joi_1.default.string().allow('').optional()
});
