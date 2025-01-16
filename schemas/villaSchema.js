"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllVillasSchema = exports.findVillaSchema = exports.removeVillaSchema = exports.updateVillaSchema = exports.createVillaSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.createVillaSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    villaName: joi_1.default.string().min(3).max(255).required(),
    villaDescription: joi_1.default.string().required(),
    villaAddress: joi_1.default.string().required(),
    villaBedCapacity: joi_1.default.number().integer().positive().required(),
    villaPrice: joi_1.default.number().integer().positive().required(),
    villaPriceFee: joi_1.default.number().integer().positive().required()
});
exports.updateVillaSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    villaId: joi_1.default.number().integer().positive().required(),
    villaName: joi_1.default.string().min(3).max(255).optional().allow(''),
    villaDescription: joi_1.default.string().optional().allow(''),
    villaAddress: joi_1.default.string().optional().allow(''),
    villaBedCapacity: joi_1.default.number().integer().positive().optional().allow(''),
    villaPrice: joi_1.default.number().integer().positive().optional().allow(''),
    villaPriceFee: joi_1.default.number().integer().positive().optional().allow('')
});
exports.removeVillaSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    villaId: joi_1.default.number().integer().positive().required()
});
exports.findVillaSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    villaId: joi_1.default.number().integer().positive().required()
});
exports.findAllVillasSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().min(0).default(0).optional(),
    size: joi_1.default.number().integer().min(1).default(10).optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().default(true).optional()
});
