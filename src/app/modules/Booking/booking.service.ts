import { Booking } from '@prisma/client';
import prisma from '../../utils/prisma';

// Create booking into DB
const createBookingIntoDB = async (id: string, payLoad: Booking) => {
  const newBooking = {
    userId: id,
    flatId: payLoad.flatId,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.flat.findUniqueOrThrow({
      where: {
        id: payLoad.flatId,
      },
    });

    const booking = await transactionClient.booking.create({
      data: newBooking,
    });

    return booking;
  });

  return result;
};

// Get all bookings from DB
const getAllBookingsFromDB = async (id: string) => {
  const bookings = await prisma.booking.findMany({
    where: {
      userId: id,
    },
    include: {
      flat: true,
      // user: true,
    },
  });
  return bookings;
};

// Update booking in DB
const updateBookingByIdIntoDB = async (
  id: string,
  bookingId: string,
  payLoad: Partial<Booking>
) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.booking.findUniqueOrThrow({
      where: { userId: id, id: bookingId },
    });

    const updatedBooking = await transactionClient.booking.update({
      where: { id: bookingId },
      data: payLoad,
    });

    return updatedBooking;
  });

  return result;
};

export const bookingService = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  updateBookingByIdIntoDB,
};
