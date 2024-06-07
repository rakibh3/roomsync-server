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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const flat_constant_1 = require("./flat.constant");
const pagination_1 = __importDefault(require("../../utils/pagination"));
// Create flat into DB
const createFlatIntoDB = (id, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.flat.create({
        data: Object.assign(Object.assign({}, payLoad), { userId: id }),
    });
    return result;
});
// Get flats created by user
const getFlatsCreatedByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.flat.findMany({
        where: { userId },
    });
    return result;
});
// Get all flats from DB
const getAllFlatsFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = (0, pagination_1.default)(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andCondition = [];
    if (params.searchTerm) {
        andCondition.push({
            OR: flat_constant_1.searchableFields.map((field) => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    const { availability, totalBedrooms, minRent, maxRent } = filterData;
    if (availability === 'true' || availability === 'false') {
        andCondition.push({ availability: { equals: availability === 'true' } });
    }
    if (totalBedrooms) {
        andCondition.push({ totalBedrooms: { gte: Number(totalBedrooms) } });
    }
    if (minRent) {
        andCondition.push({ rent: { gte: Number(minRent) } });
    }
    if (maxRent) {
        andCondition.push({ rent: { lte: Number(maxRent) } });
    }
    const whereCondition = { AND: andCondition };
    const result = yield prisma_1.default.flat.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { createdAt: 'desc' },
    });
    const total = yield prisma_1.default.flat.count({ where: whereCondition });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// Update flat in DB
const updateFlatByIdIntoDB = (id, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.flat.findUniqueOrThrow({
            where: { id },
        });
        const updatedFlat = yield transactionClient.flat.update({
            where: { id },
            data: payLoad,
        });
        return updatedFlat;
    }));
    return result;
});
// Delete flat by ID from DB
const deleteFlatByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.flat.delete({
        where: { id },
    });
    return result;
});
// Get flat by ID from DB
const getFlatByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.flat.findUnique({
        where: { id },
    });
    return result;
});
exports.flatService = {
    createFlatIntoDB,
    getAllFlatsFromDB,
    updateFlatByIdIntoDB,
    getFlatsCreatedByUser,
    deleteFlatByIdFromDB,
    getFlatByIdFromDB,
};
