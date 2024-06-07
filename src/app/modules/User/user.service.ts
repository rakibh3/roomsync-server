import bcrypt from 'bcrypt';
import prisma from '../../utils/prisma';
import config from '../../config';
import { User } from '@prisma/client';
import { TManageUser, TUserUpdate } from '../../interfaces/userUpdate';
import { filterPayload } from '../../utils/allowField';

// Create user into DB
const createUserIntoDB = async (payLoad: User) => {
  try {
    const hasedPassword: string = await bcrypt.hash(
      payLoad.password,
      Number(config.bcrypt_salt_rounds)
    );

    const userData = {
      name: payLoad.name,
      username: payLoad.username,
      email: payLoad.email,
      profilePhoto: payLoad.profilePhoto,
      password: hasedPassword,
    };

    const result = await prisma.user.create({
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
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

// Get user profile from DB
const getUserFromDB = async (id: string) => {
  const result = await prisma.user.findUniqueOrThrow({
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
};

// Update user profile in DB
const updateUserProfileInDB = async (id: string, payLoad: TUserUpdate) => {
  const allowedFields = ['name', 'username', 'email'];
  const filteredPayload = filterPayload(payLoad, allowedFields);

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.findUniqueOrThrow({
      where: { id },
    });

    const updateUser = await transactionClient.user.update({
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
  });
  return result;
};

// Manage user profile
const manageUserProfileInDB = async (id: string, payLoad: TManageUser) => {
  const allowedFields = ['role', 'activeStatus'];
  const filteredPayload = filterPayload(payLoad, allowedFields);

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.findUniqueOrThrow({
      where: { id },
    });

    const updateUser = await transactionClient.user.update({
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
  });
  return result;
};

// Get all users from DB
const getAllUsersFromDB = async () => {
  const result = await prisma.user.findMany({
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
};

export const userService = {
  createUserIntoDB,
  getUserFromDB,
  updateUserProfileInDB,
  manageUserProfileInDB,
  getAllUsersFromDB,
};
