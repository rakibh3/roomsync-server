import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { flatService } from './flat.service';
import pick from '../../utils/pick';

// Create flat
const createFlat = catchAsync(async (req, res) => {
  const { id } = req.user;
  const result = await flatService.createFlatIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Flat added successfully',
    data: result,
  });
});

// Get all flats
const getAllFlats = catchAsync(async (req, res) => {
  const query = pick(req.query, [
    'searchTerm',
    'availability',
    'totalBedrooms',
    'minRent',
    'maxRent',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await flatService.getAllFlatsFromDB(query, options);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flats retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// Update flat by UserID
const getFlatsCreatedByUser = catchAsync(async (req, res) => {
  const { id } = req.user;
  const result = await flatService.getFlatsCreatedByUser(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flats retrieved successfully',
    data: result,
  });
});

// Update flat by ID
const updateFlatById = catchAsync(async (req, res) => {
  const { flatId } = req.params;
  const result = await flatService.updateFlatByIdIntoDB(flatId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flat information updated successfully',
    data: result,
  });
});

// Delete flat by ID
const deleteFlatById = catchAsync(async (req, res) => {
  const { flatId } = req.params;
  const result = await flatService.deleteFlatByIdFromDB(flatId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.NO_CONTENT,
    message: 'Flat deleted successfully',
    data: result,
  });
});

// Get flat by ID
const getFlatById = catchAsync(async (req, res) => {
  const { flatId } = req.params;
  const result = await flatService.getFlatByIdFromDB(flatId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flat retrieved successfully',
    data: result,
  });
});

export const flatController = {
  createFlat,
  getAllFlats,
  updateFlatById,
  getFlatsCreatedByUser,
  deleteFlatById,
  getFlatById,
};
