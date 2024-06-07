import jwt from 'jsonwebtoken';

export const generateToken = (
  payLoad: any,
  secret: string,
  expiresIn: string
) => {
  const accessToken = jwt.sign(payLoad, secret, {
    expiresIn,
  });
  return accessToken;
};
