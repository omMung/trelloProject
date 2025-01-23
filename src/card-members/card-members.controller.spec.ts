import { Test, TestingModule } from '@nestjs/testing';
import { CardMembersController } from './card-members.controller';
import { CardMembersService } from './card-members.service';

describe('CardMembersController', () => {
  let controller: CardMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardMembersController],
      providers: [CardMembersService],
    }).compile();

    controller = module.get<CardMembersController>(CardMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
