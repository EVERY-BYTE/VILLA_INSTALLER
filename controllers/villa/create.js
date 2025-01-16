"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const villaModel_1 = require("../../models/villaModel");
const villaSchema_1 = require("../../schemas/villaSchema");
const logger_1 = __importDefault(require("../../utilities/logger"));
const create = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(villaSchema_1.createVillaSchema, req.body);
    if (error) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    console.log(value.jwtPayload);
    try {
        const villa = await villaModel_1.VillaModel.create({
            ...value,
            villaOwnerId: value.jwtPayload?.userId
        });
        const response = response_1.ResponseData.success(villa);
        logger_1.default.info('Villa created successfully');
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.create = create;
