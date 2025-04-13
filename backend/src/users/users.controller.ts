import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../common/decorators/get-user.decorator";
import { User } from "./schemas/user.schema";

@Controller("profile")
@UseGuards(AuthGuard("jwt"))
export class UsersController {
  @Get()
  getProfile(@GetUser() user: User) {
    return user;
  }
}
