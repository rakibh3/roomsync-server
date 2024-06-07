import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { bookingService } from './booking.service';

// Create booking
const createBooking = catchAsync(async (req, res) => {
  const { id } = req.user;
  const booking = await bookingService.createBookingIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Booking requests submitted successfully',
    data: booking,
  });
});

// Get all bookings
const getAllBookings = catchAsync(async (req, res) => {
  const { id } = req.user;
  const bookings = await bookingService.getAllBookingsFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking requests retrieved successfully',
    data: bookings,
  });
});

// Update booking by ID
const updateBookingById = catchAsync(async (req, res) => {
  const { bookingId } = req.params;
  const { id } = req.user;
  const result = await bookingService.updateBookingByIdIntoDB(
    id,
    bookingId,
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking request updated successfully',
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getAllBookings,
  updateBookingById,
};
