import { Test, TestingModule } from '@nestjs/testing';
import { CardLabelsService } from './card-labels.service';

describe('CardLabelsService', () => {
  let service: CardLabelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardLabelsService],
    }).compile();

    service = module.get<CardLabelsService>(CardLabelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
