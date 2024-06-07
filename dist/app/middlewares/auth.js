"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const catchAsync_1 = require("../utils/catchAsync");
const AppError_1 = __importDefault(require("../error/AppError"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const unauthorizeError_1 = require("../error/unauthorizeError");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        // Checking if the token is missing
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access');
        }
        // Checking if the given token is valid
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        if (!decoded) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access');
        }
        const { id, email, role } = decoded;
        const user = yield prisma_1.default.user.findUniqueOrThrow({
            where: { id, email },
        });
        if (!user) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access');
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            res.status(http_status_1.default.UNAUTHORIZED).json(unauthorizeError_1.unauthorizedErrorResponse);
            return;
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
