import { userService } from './user.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';

// Create user profile
const createUser = catchAsync(async (req, res) => {
  const resultt = await userService.createUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: resultt,
  });
});

// Get user profile
const getUserProfile = catchAsync(async (req, res) => {
  const { id } = req.user;
  const result = await userService.getUserFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

// Update user profile
const updateUserProfile = catchAsync(async (req, res) => {
  const { id } = req.user;

  const result = await userService.updateUserProfileInDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile updated successfully',
    data: result,
  });
});

// Update user profile
const managerUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await userService.manageUserProfileInDB(userId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: result,
  });
});

// Get all users
const getAllUsers = catchAsync(async (req, res) => {
  const result = await userService.getAllUsersFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All users retrieved successfully',
    data: result,
  });
});

export const userController = {
  createUser,
  getUserProfile,
  updateUserProfile,
  managerUser,
  getAllUsers,
};
