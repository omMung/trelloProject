import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { AuthService } from '../auth/services/auth.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { AuthController } from '../auth/controllers/auth.controller';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RedisModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService],
})
export class UsersModule {}
