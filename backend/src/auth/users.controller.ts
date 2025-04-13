import { Controller, Get, UseGuards, NotFoundException } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { GetUser } from "../common/decorators/get-user.decorator";
import { UsersService } from "./users.service";

@Controller("profile")
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getProfile(@GetUser() userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }
}
