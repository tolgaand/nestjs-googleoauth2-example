import { Controller, Get, Body, UseGuards, Req } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth-guard';

@Controller('auth')
export class UserController {
  constructor() {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  loginOrRegister(@Req() req) {
    return { data: req.user };

    // return this.userService.create(createUserDto);
  }
}
