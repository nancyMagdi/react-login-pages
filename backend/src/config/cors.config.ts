// cors.config.ts
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { ConfigService } from "@nestjs/config";

export const corsConfig: CorsOptions = {
  origin:
    new ConfigService().get<string>("FRONTEND_URL") || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
