import { Controller, Logger, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./local-auth.guard";
import { AuthService } from "./auth.service";

@Controller("")
export class AuthController {
  
  constructor(
    private readonly  logger: Logger,
    private authService: AuthService
  ) {
  }
  
  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  async login(@Request() req: any) {
    const logId = "auth.controller.login";
    this.logger.log("Login");
    return this.authService.login(req.user);
  }
  
}
