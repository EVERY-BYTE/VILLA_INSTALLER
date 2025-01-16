"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.userSchema = exports.findOneUserSchema = exports.findAllUsersSchema = exports.userRegistrationSchema = exports.userLoginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.userLoginSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    userName: joi_1.default.string().required(),
    userPassword: joi_1.default.string().required()
});
exports.userRegistrationSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    userName: joi_1.default.string().required(),
    userRole: joi_1.default.string()
        .valid('SuperAdmin', 'Admin', 'Finance', 'Owner', 'Agency', 'Marketing')
        .required(),
    userPassword: joi_1.default.string().min(6).required()
});
exports.findAllUsersSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().min(0).default(0).optional(),
    size: joi_1.default.number().integer().min(1).default(10).optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().default(true).optional(),
    userRole: joi_1.default.string()
        .valid('SuperAdmin', 'Admin', 'Finance', 'Owner', 'Agency', 'Marketing')
        .optional()
        .allow('')
});
exports.findOneUserSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    userId: joi_1.default.string().required(),
    userRole: joi_1.default.string()
        .valid('SuperAdmin', 'Admin', 'Finance', 'Owner', 'Agency', 'Marketing')
        .optional()
        .allow('')
});
exports.userSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    userId: joi_1.default.string().required(),
    userName: joi_1.default.string().min(3).max(30).required(),
    userPassword: joi_1.default.string().min(6).max(128).required(),
    userRole: joi_1.default.string()
        .valid('SuperAdmin', 'Admin', 'Finance', 'Owner', 'Agency', 'Marketing')
        .required()
});
exports.updateUserSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    userId: joi_1.default.string().required(),
    userName: joi_1.default.string().min(3).max(30).required(),
    userPassword: joi_1.default.string().min(6).max(128).required(),
    userRole: joi_1.default.string()
        .valid('SuperAdmin', 'Admin', 'Finance', 'Owner', 'Agency', 'Marketing')
        .required()
});
