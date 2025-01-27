import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
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
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import Joi from 'joi';

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
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
