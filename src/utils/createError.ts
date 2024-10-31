import { ErrorObject } from "../types/error";

export const createError = (
  message: string,
  statusCode: number = 400
): ErrorObject => {
  const err = new Error(message) as ErrorObject;
  err.statusCode = statusCode;
  throw err;
};
