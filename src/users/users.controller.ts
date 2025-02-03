import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 내 정보 조회 API (JWT 보호)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyInfo(@Request() req) {
    const userId = req.user.id; // JWT에서 추출한 id

    return this.usersService.getUserById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateMyInfo(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.id; // JWT에서 추출한 id

    return this.usersService.update(userId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  async deleteMyAccount(@Request() req) {
    console.log('@@@@@@@@@@@');
    const userId = req.user.id;
    return this.usersService.delete(userId);
  }
}
