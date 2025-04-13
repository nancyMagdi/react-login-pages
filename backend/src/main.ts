import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { ValidationPipe } from "@nestjs/common/pipes/validation.pipe";
import { ValidationFilter } from "./common/filters/validation.filter";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { nestWinstonLogger } from "./common/logger/winston.logger";
import { corsConfig } from "./config/cors.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: nestWinstonLogger,
  });

  // Security middleware
  app.use(helmet());
  app.enableCors(corsConfig);
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter(nestWinstonLogger));
  app.useGlobalFilters(new ValidationFilter());
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
