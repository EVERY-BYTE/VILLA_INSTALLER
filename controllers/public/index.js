"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicController = void 0;
const bookingInfo_1 = require("./bookingInfo");
exports.publicController = {
    findBookingInfo: bookingInfo_1.getAllVillasWithBookings
};
