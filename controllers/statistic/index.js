"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statisticController = void 0;
const total_1 = require("./total");
const report_1 = require("./report");
const bookingReport_1 = require("./bookingReport");
exports.statisticController = {
    findTotal: total_1.findTotal,
    findReportTotals: report_1.findReportTotals,
    bookingReports: bookingReport_1.bookingReports
};
