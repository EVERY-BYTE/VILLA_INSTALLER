"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouterV1 = void 0;
const controllers_1 = require("../../controllers");
const userRouter_1 = __importDefault(require("./userRouter"));
const villaRouter_1 = __importDefault(require("./villaRouter"));
const uploadFileRouter_1 = __importDefault(require("./uploadFileRouter"));
const bookingRouter_1 = __importDefault(require("./bookingRouter"));
const reportRouter_1 = __importDefault(require("./reportRouter"));
const statisticRouter_1 = __importDefault(require("./statisticRouter"));
const publicRouter_1 = __importDefault(require("./publicRouter"));
const appRouterV1 = (app) => {
    app.get(`/api/v1`, async (req, res) => await (0, controllers_1.index)(req, res));
    app.use(`/api/v1/users`, userRouter_1.default);
    app.use(`/api/v1/files`, uploadFileRouter_1.default);
    app.use(`/api/v1/villas`, villaRouter_1.default);
    app.use(`/api/v1/bookings`, bookingRouter_1.default);
    app.use(`/api/v1/reports`, reportRouter_1.default);
    app.use(`/api/v1/statistic`, statisticRouter_1.default);
    app.use(`/api/v1/main`, publicRouter_1.default);
};
exports.appRouterV1 = appRouterV1;
