import { Test, TestingModule } from '@nestjs/testing';
import { CardMembersService } from './card-members.service';

describe('CardMembersService', () => {
  let service: CardMembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardMembersService],
    }).compile();

    service = module.get<CardMembersService>(CardMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
