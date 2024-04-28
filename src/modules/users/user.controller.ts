import { Controller, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Delete('delete/user')
  deleteUser(@Req() request: number) {
    return this.usersService.removeUser(request);
  }
}
