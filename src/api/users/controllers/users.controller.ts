import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async listUsers(@Query('since') since?: number) {
    return this.userService.listUsers(since);
  }

  @Get(':username/details')
  async getUserDetails(@Param('username') username: string) {
    return this.userService.getUserDetails(username);
  }

  @Get(':username/repos')
  async getUserRepos(@Param('username') username: string) {
    return this.userService.getUserRepos(username);
  }
}
