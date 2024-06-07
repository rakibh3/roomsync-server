"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatRouter = void 0;
const express_1 = __importDefault(require("express"));
const flat_controller_1 = require("./flat.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const flat_validation_1 = require("./flat.validation");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
// Create flat
router.post('/flats', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), (0, validateRequest_1.validateRequest)(flat_validation_1.flatCreateValidationSchema), flat_controller_1.flatController.createFlat);
router.get('/flats', flat_controller_1.flatController.getAllFlats);
router.get('/my-flats', (0, auth_1.default)(client_1.UserRole.USER), flat_controller_1.flatController.getFlatsCreatedByUser);
router.put('/flats/:flatId', (0, auth_1.default)(client_1.UserRole.USER, client_1.UserRole.ADMIN), (0, validateRequest_1.validateRequest)(flat_validation_1.flatUpdateValidationSchema), flat_controller_1.flatController.updateFlatById);
router.delete('/flats/:flatId', (0, auth_1.default)(client_1.UserRole.USER, client_1.UserRole.ADMIN), flat_controller_1.flatController.deleteFlatById);
router.get('/flat/:flatId', flat_controller_1.flatController.getFlatById);
exports.flatRouter = router;
