"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllMarketingsSchema = exports.findMarketingSchema = exports.removeMarketingSchema = exports.updateMarketingSchema = exports.createMarketingSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.createMarketingSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    marketingName: joi_1.default.string().min(3).max(255).required()
});
exports.updateMarketingSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    marketingId: joi_1.default.number().integer().positive().required(),
    marketingName: joi_1.default.string().min(3).max(255).required()
});
exports.removeMarketingSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    marketingId: joi_1.default.number().integer().positive().required()
});
exports.findMarketingSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    marketingId: joi_1.default.number().integer().positive().required()
});
exports.findAllMarketingsSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().min(0).default(0).optional(),
    size: joi_1.default.number().integer().min(1).default(10).optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().default(true).optional()
});
