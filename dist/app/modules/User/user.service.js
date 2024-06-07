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
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const config_1 = __importDefault(require("../../config"));
const allowField_1 = require("../../utils/allowField");
// Create user into DB
const createUserIntoDB = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hasedPassword = yield bcrypt_1.default.hash(payLoad.password, Number(config_1.default.bcrypt_salt_rounds));
        const userData = {
            name: payLoad.name,
            username: payLoad.username,
            email: payLoad.email,
            profilePhoto: payLoad.profilePhoto,
            password: hasedPassword,
        };
        const result = yield prisma_1.default.user.create({
            data: userData,
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                activeStatus: true,
                role: true,
                profilePhoto: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return result;
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
});
// Get user profile from DB
const getUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUniqueOrThrow({
        where: { id },
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            activeStatus: true,
            role: true,
            profilePhoto: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
// Update user profile in DB
const updateUserProfileInDB = (id, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const allowedFields = ['name', 'username', 'email'];
    const filteredPayload = (0, allowField_1.filterPayload)(payLoad, allowedFields);
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.user.findUniqueOrThrow({
            where: { id },
        });
        const updateUser = yield transactionClient.user.update({
            where: { id },
            data: filteredPayload,
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                activeStatus: true,
            },
        });
        return updateUser;
    }));
    return result;
});
// Manage user profile
const manageUserProfileInDB = (id, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const allowedFields = ['role', 'activeStatus'];
    const filteredPayload = (0, allowField_1.filterPayload)(payLoad, allowedFields);
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.user.findUniqueOrThrow({
            where: { id },
        });
        const updateUser = yield transactionClient.user.update({
            where: { id },
            data: filteredPayload,
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                activeStatus: true,
                role: true,
            },
        });
        return updateUser;
    }));
    return result;
});
// Get all users from DB
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({
        where: {
            role: 'USER',
        },
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            role: true,
            activeStatus: true,
            profilePhoto: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
exports.userService = {
    createUserIntoDB,
    getUserFromDB,
    updateUserProfileInDB,
    manageUserProfileInDB,
    getAllUsersFromDB,
};
