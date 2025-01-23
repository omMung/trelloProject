import { Test, TestingModule } from '@nestjs/testing';
import { CheckitemsService } from './checkitems.service';

describe('CheckitemsService', () => {
  let service: CheckitemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckitemsService],
    }).compile();

    service = module.get<CheckitemsService>(CheckitemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
