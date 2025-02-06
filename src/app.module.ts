import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { ListsModule } from './lists/lists.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { ChecklistsModule } from './checklists/checklists.module';
import { AlarmsModule } from './alarms/alarms.module';
import { MembersModule } from './members/members.module';
import { CardMembersModule } from './card-members/card-members.module';
import { LabelsModule } from './labels/labels.module';
import { CheckitemsModule } from './checkitems/checkitems.module';
import { CardLabelsModule } from './card-labels/card-labels.module';
import { FileModule } from './files/file.module';
// import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import Joi from 'joi';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [__dirname + '/**/entities/*.{ts,js}'],
    synchronize: configService.get('DB_SYNC'),
    logging: true,
  }),
  inject: [ConfigService],
};
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNC: Joi.boolean().required(),
        ACCESS_SECRET_KEY: Joi.string().required(), // 액세스 시크릿 키 검증 추가
        ACCESS_EXPIRES_IN: Joi.string().default('1m'), // 액세스 만료시간 검증 추가
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    // JwtModule 등록 (글로벌 제공)
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('ACCESS_EXPIRES_IN'),
        },
      }),
    }),
    UsersModule,
    BoardsModule,
    ListsModule,
    CardsModule,
    CommentsModule,
    ChecklistsModule,
    AlarmsModule,
    MembersModule,
    CardMembersModule,
    LabelsModule,
    CheckitemsModule,
    CardLabelsModule,
    FileModule,
    AuthModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule, AuthModule],
})
export class AppModule {}
