import bcrypt from 'bcrypt';
import prisma from '../../utils/prisma';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import config from '../../config';
import { generateToken } from '../../utils/generateToken';
import { verifyToken } from '../../utils/verifyToken';
import { JwtPayload } from 'jsonwebtoken';

// Login user
const loginUser = async (payLoad: {
  email?: string;
  username?: string;
  password: string;
}) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      OR: [{ email: payLoad.email }, { username: payLoad.username }],
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payLoad.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect');
  }

  const jwtPayload = {
    id: userData?.id,
    email: userData?.email,
    username: userData?.username,
    role: userData?.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = generateToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

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
};

// Refresh token
const refreshToken = async (refreshToken: string) => {
  const decoded = verifyToken(
    refreshToken,
    config.jwt_refresh_secret as string
  );

  if (!decoded) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: decoded?.id,
    },
  });

  const jwtPayload = {
    id: userData?.id,
    email: userData?.email,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return { accessToken };
};

// Change password
const changePassword = async (
  payLoad: {
    oldPassword: string;
    newPassword: string;
  },
  user: JwtPayload
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payLoad.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new AppError(httpStatus.FORBIDDEN, 'Old Password is incorrect');
  }

  const hashedPassword = await bcrypt.hash(
    payLoad.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await prisma.user.update({
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
};

export const authService = {
  loginUser,
  refreshToken,
  changePassword,
};
