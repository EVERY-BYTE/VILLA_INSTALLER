"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegister = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const validateRequest_1 = require("../../utilities/validateRequest");
const userSchema_1 = require("../../schemas/userSchema");
const response_1 = require("../../utilities/response");
const userModel_1 = require("../../models/userModel");
const scure_password_1 = require("../../utilities/scure_password");
const logger_1 = __importDefault(require("../../utilities/logger"));
const userRegister = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(userSchema_1.userRegistrationSchema, req.body);
    if (error) {
        const message = `Invalid request parameter! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const { userName, userPassword } = value;
    try {
        const existingUser = await userModel_1.UserModel.findOne({
            raw: true,
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userName: { [sequelize_1.Op.eq]: userName }
            }
        });
        if (existingUser) {
            const message = `Username ${existingUser.userName} is already registered. Please use another one.`;
            logger_1.default.info(`Registration attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
        }
        const hashedPassword = (0, scure_password_1.hashPassword)(userPassword);
        const newUser = {
            ...value,
            userPassword: hashedPassword
        };
        await userModel_1.UserModel.create(newUser);
        logger_1.default.info(`User ${userName} registered successfully`);
        return res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json(response_1.ResponseData.success({ message: 'Registration successful' }));
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.userRegister = userRegister;
