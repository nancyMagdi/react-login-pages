import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const request: Request = context.switchToHttp().getRequest();
      const { authorization }: any = request.headers;
      if (typeof authorization !== "string" || authorization.trim() === "") {
        throw new UnauthorizedException("Please provide token");
      }
      const authToken: string = authorization.replace(/Bearer/gi, "").trim();
      const resp = this.authService.validateToken(authToken);
      return !!resp;
    } catch (error) {
      console.log("auth error - ", error.message);
      throw new ForbiddenException(
        error.message || "session expired! Please sign In",
      );
    }
  }
}
