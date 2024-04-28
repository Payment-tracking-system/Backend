import {Controller, Delete, Get, Query, Req} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Delete('delete')
  deleteUser(@Req() request: number) {
    return this.usersService.removeUser(request);
  }

  @Get('get')
  getUsers(@Query('limit') limit: string, @Query('page') page: string){
    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);
    return this.usersService.getUsers(parsedLimit, parsedPage);
  }
}
