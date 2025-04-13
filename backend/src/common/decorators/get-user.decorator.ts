import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // If data is provided, return the specified property from user object
    // Otherwise return the entire user object
    return data ? user?.[data] : user;
  },
);
