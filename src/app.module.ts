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
import { Alarm } from './alarms/entities/alarm.entity';
import { Board } from './boards/entities/board.entity';
import { CardLabel } from './card-labels/entities/card-label.entity';
import { JoinMember } from './card-members/entities/card-member.entity';
import { Card } from './cards/entities/card.entity';
import { CheckItem } from './checkitems/entities/checkitem.entity';
import { CheckList } from './checklists/entities/checklist.entity';
import { Comment } from './comments/entities/comment.entity';
import { Label } from './labels/entities/label.entity';
import { List } from './lists/entities/list.entity';
import { Member } from './members/entities/member.entity';
import { User } from './users/entities/user.entity';
// import Joi from 'joi';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql', //분리 추천??
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [
      Alarm,
      Board,
      CardLabel,
      JoinMember,
      Card,
      CheckItem,
      CheckList,
      Comment,
      Label,
      List,
      Member,
      User,
    ],
    synchronize: configService.get('DB_SYNC'),
    logging: true,
  }),
  inject: [ConfigService],
};
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // validationSchema: Joi.object({
      //   DB_HOST: Joi.string().required(),
      //   DB_PORT: Joi.number().required(),
      //   DB_USERNAME: Joi.string().required(),
      //   DB_PASSWORD: Joi.string().required(),
      //   DB_NAME: Joi.string().required(),
      //   DB_SYNC: Joi.boolean().required(),
      // }),
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
