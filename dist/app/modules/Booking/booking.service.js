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
exports.bookingService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
// Create booking into DB
const createBookingIntoDB = (id, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const newBooking = {
        userId: id,
        flatId: payLoad.flatId,
    };
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.flat.findUniqueOrThrow({
            where: {
                id: payLoad.flatId,
            },
        });
        const booking = yield transactionClient.booking.create({
            data: newBooking,
        });
        return booking;
    }));
    return result;
});
// Get all bookings from DB
const getAllBookingsFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield prisma_1.default.booking.findMany({
        where: {
            userId: id,
        },
        include: {
            flat: true,
            // user: true,
        },
    });
    return bookings;
});
// Update booking in DB
const updateBookingByIdIntoDB = (id, bookingId, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.booking.findUniqueOrThrow({
            where: { userId: id, id: bookingId },
        });
        const updatedBooking = yield transactionClient.booking.update({
            where: { id: bookingId },
            data: payLoad,
        });
        return updatedBooking;
    }));
    return result;
});
exports.bookingService = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    updateBookingByIdIntoDB,
};
