export class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}


export interface AppErrorType extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
}

export function createAppError(message: string, statusCode: number): AppErrorType {
  const error = new Error(message) as AppErrorType;

  error.statusCode = statusCode;
  error.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
  error.isOperational = true;

  Error.captureStackTrace(error, createAppError);

  return error;
}
