import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";
import { ValidationError } from "class-validator";

@Catch(HttpException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    if (
      status === 400 &&
      Array.isArray((exceptionResponse as any).message) &&
      (exceptionResponse as any).message[0] instanceof ValidationError
    ) {
      const validationErrors = (exceptionResponse as any)
        .message as ValidationError[];
      const formattedErrors = this.formatErrors(validationErrors);

      response.status(status).json({
        statusCode: status,
        message: "Validation failed",
        errors: formattedErrors,
      });
    } else {
      response.status(status).json(exceptionResponse);
    }
  }

  private formatErrors(errors: ValidationError[]) {
    const result = {};
    errors.forEach((error) => {
      if (error instanceof ValidationError && error.constraints) {
        result[error.property] = Object.values(error.constraints);
      }

      if (error.children && error.children.length > 0) {
        result[error.property] = this.formatErrors(error.children);
      }
    });
    return result;
  }
}
