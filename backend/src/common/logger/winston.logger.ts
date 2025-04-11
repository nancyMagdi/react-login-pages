import { utilities, WinstonModule } from "nest-winston";
import * as winston from "winston";
import "winston-daily-rotate-file";

export const nestWinstonLogger = WinstonModule.createLogger({
  transports: [
    // Console transport (for development)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        utilities.format.nestLike("NestJS", {
          colors: true,
          prettyPrint: true,
        }),
      ),
      level: "debug",
    }),

    // Daily rotating file transport (for production)
    new winston.transports.DailyRotateFile({
      filename: "logs/application-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      level: "info",
    }),

    // Error-specific file transport
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],

  // Global logger options
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/exceptions.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "logs/rejections.log" }),
  ],
});
