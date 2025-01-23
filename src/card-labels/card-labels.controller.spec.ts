import { Test, TestingModule } from '@nestjs/testing';
import { CardLabelsController } from './card-labels.controller';
import { CardLabelsService } from './card-labels.service';

describe('CardLabelsController', () => {
  let controller: CardLabelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardLabelsController],
      providers: [CardLabelsService],
    }).compile();

    controller = module.get<CardLabelsController>(CardLabelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
