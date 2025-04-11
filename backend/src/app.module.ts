import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URI || "mongodb://localhost:27017/auth-api",
    ),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
