"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_1 = require("../../controllers/report");
const middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
router.get('/', middlewares_1.middleware.useAuthorization, report_1.reportControllers.findAll);
router.get('/detail/:reportId', middlewares_1.middleware.useAuthorization, report_1.reportControllers.findOne);
router.post('/', middlewares_1.middleware.useAuthorization, report_1.reportControllers.create);
router.patch('/', middlewares_1.middleware.useAuthorization, report_1.reportControllers.update);
router.delete('/:reportId', middlewares_1.middleware.useAuthorization, report_1.reportControllers.remove);
exports.default = router;
