"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_1 = require("../../controllers/main");
const router = (0, express_1.Router)();
router.get('/bookings', main_1.mainController.findBookingInfo);
exports.default = router;
