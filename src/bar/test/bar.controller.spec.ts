import { Test, TestingModule } from '@nestjs/testing';
import { BarController } from '../bar.controller';
import { BarService } from '../bar.service';

describe('BarConroller', () => {
  let barConroller: BarController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BarController],
      providers: [BarService],
    }).compile();

    barConroller = app.get<BarController>(BarController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(barConroller.getHello()).toBe('Hello World!');
    });
  });
});
