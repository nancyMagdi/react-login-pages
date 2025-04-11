import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import { nestWinstonLogger } from "../logger/winston.logger";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: typeof nestWinstonLogger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";
    let code = "INTERNAL_ERROR";

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === "object" && "message" in exceptionResponse
          ? String((exceptionResponse as { message: string }).message)
          : String(exceptionResponse);
      code = (exceptionResponse as any).code || exception.name;
    } else if (exception instanceof Error) {
      message = exception.message;
      code = exception.name;
    }

    this.logger.error({
      message: `${request.method} ${request.url} failed`,
      status,
      error: message,
      stack: exception instanceof Error ? exception.stack : undefined,
    });

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      code,
    });
  }
}
