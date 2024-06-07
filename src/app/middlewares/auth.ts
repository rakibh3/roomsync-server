import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../error/AppError';
import prisma from '../utils/prisma';
import { unauthorizedErrorResponse } from '../error/unauthorizeError';
import { UserRole } from '@prisma/client';

const auth = (...requiredRoles: UserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // Checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
    }

    // Checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    if (!decoded) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
    }

    const { id, email, role } = decoded;

    const user = await prisma.user.findUniqueOrThrow({
      where: { id, email },
    });

    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      res.status(httpStatus.UNAUTHORIZED).json(unauthorizedErrorResponse);
      return;
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
