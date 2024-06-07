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
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const generateToken_1 = require("../../utils/generateToken");
const verifyToken_1 = require("../../utils/verifyToken");
// Login user
const loginUser = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findFirstOrThrow({
        where: {
            OR: [{ email: payLoad.email }, { username: payLoad.username }],
        },
    });
    const isCorrectPassword = yield bcrypt_1.default.compare(payLoad.password, userData.password);
    if (!isCorrectPassword) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password is incorrect');
    }
    const jwtPayload = {
        id: userData === null || userData === void 0 ? void 0 : userData.id,
        email: userData === null || userData === void 0 ? void 0 : userData.email,
        username: userData === null || userData === void 0 ? void 0 : userData.username,
        role: userData === null || userData === void 0 ? void 0 : userData.role,
    };
    const accessToken = (0, generateToken_1.generateToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, generateToken_1.generateToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    const userDataWithoutPassword = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        token: accessToken,
    };
    return {
        userDataWithoutPassword,
        refreshToken,
    };
});
// Refresh token
const refreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = (0, verifyToken_1.verifyToken)(refreshToken, config_1.default.jwt_refresh_secret);
    if (!decoded) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
    }
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: decoded === null || decoded === void 0 ? void 0 : decoded.id,
        },
    });
    const jwtPayload = {
        id: userData === null || userData === void 0 ? void 0 : userData.id,
        email: userData === null || userData === void 0 ? void 0 : userData.email,
    };
    const accessToken = (0, generateToken_1.generateToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return { accessToken };
});
// Change password
const changePassword = (payLoad, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user.email,
        },
    });
    const isCorrectPassword = yield bcrypt_1.default.compare(payLoad.oldPassword, userData.password);
    if (!isCorrectPassword) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Old Password is incorrect');
    }
    const hashedPassword = yield bcrypt_1.default.hash(payLoad.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield prisma_1.default.user.update({
        where: {
            email: user.email,
        },
        data: {
            password: hashedPassword,
        },
    });
    return {
        message: 'Password changed successfully!',
    };
});
exports.authService = {
    loginUser,
    refreshToken,
    changePassword,
};
