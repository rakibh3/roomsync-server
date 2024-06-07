import { Flat, Prisma } from '@prisma/client';
import prisma from '../../utils/prisma';
import { searchableFields } from './flat.constant';
import paginaton from '../../utils/pagination';
import { TSearchAvailableFlats } from './flat.interface';
import { TPaginationOptions } from '../../interfaces/pagination';

// Create flat into DB
const createFlatIntoDB = async (id: string, payLoad: Flat) => {
  const result = await prisma.flat.create({
    data: {
      ...payLoad,
      userId: id,
    },
  });
  return result;
};

// Get flats created by user
const getFlatsCreatedByUser = async (userId: string) => {
  const result = await prisma.flat.findMany({
    where: { userId },
  });
  return result;
};

// Get all flats from DB
const getAllFlatsFromDB = async (
  params: TSearchAvailableFlats,
  options: TPaginationOptions
) => {
  const { page, limit, skip } = paginaton(options);
  const { searchTerm, ...filterData } = params;

  const andCondition: Prisma.FlatWhereInput[] = [];

  if (params.searchTerm) {
    andCondition.push({
      OR: searchableFields.map((field) => ({
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

  const whereCondition: Prisma.FlatWhereInput = { AND: andCondition };

  const result = await prisma.flat.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  const total = await prisma.flat.count({ where: whereCondition });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Update flat in DB
const updateFlatByIdIntoDB = async (id: string, payLoad: Partial<Flat>) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.flat.findUniqueOrThrow({
      where: { id },
    });

    const updatedFlat = await transactionClient.flat.update({
      where: { id },
      data: payLoad,
    });

    return updatedFlat;
  });

  return result;
};

// Delete flat by ID from DB
const deleteFlatByIdFromDB = async (id: string) => {
  const result = await prisma.flat.delete({
    where: { id },
  });
  return result;
};

// Get flat by ID from DB
const getFlatByIdFromDB = async (id: string) => {
  const result = await prisma.flat.findUnique({
    where: { id },
  });
  return result;
};

export const flatService = {
  createFlatIntoDB,
  getAllFlatsFromDB,
  updateFlatByIdIntoDB,
  getFlatsCreatedByUser,
  deleteFlatByIdFromDB,
  getFlatByIdFromDB,
};
