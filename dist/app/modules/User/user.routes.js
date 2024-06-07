"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_validation_1 = require("./user.validation");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
// Create user profile
router.post('/register', (0, validateRequest_1.validateRequest)(user_validation_1.userCreateValidationSchema), user_controller_1.userController.createUser);
// Get user profile based on logged in user
router.get('/my-profile', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), user_controller_1.userController.getUserProfile);
// Update user email/username based on logged in user
router.put('/my-profile', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), (0, validateRequest_1.validateRequest)(user_validation_1.userUpdateValidationSchema), user_controller_1.userController.updateUserProfile);
// Manage user role and status based on user id ADMIN only
router.put('/manager-user/:userId', (0, auth_1.default)(client_1.UserRole.ADMIN), (0, validateRequest_1.validateRequest)(user_validation_1.userManageValidationSchema), user_controller_1.userController.managerUser);
// Get all users ADMIN only
router.get('/all-users', (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.userController.getAllUsers);
exports.userRouter = router;
