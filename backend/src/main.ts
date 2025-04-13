import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
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
  // Add this line to enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove non-whitelisted properties
      forbidNonWhitelisted: true, // throw errors for non-whitelisted properties
      transform: true, // automatically transform payloads to DTO instances
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter(nestWinstonLogger));
  app.useGlobalFilters(new ValidationFilter());

  const config = new DocumentBuilder()
    .setTitle("Auth API")
    .setDescription("Authentication API with NestJS and MongoDB")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
