import { Test, TestingModule } from '@nestjs/testing';
import { CheckitemsController } from './checkitems.controller';
import { CheckitemsService } from './checkitems.service';

describe('CheckitemsController', () => {
  let controller: CheckitemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckitemsController],
      providers: [CheckitemsService],
    }).compile();

    controller = module.get<CheckitemsController>(CheckitemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
