import { Queue } from 'bullmq';
import { MathController } from '../controllers/math.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { BinaryOperationDto } from '../dtos/binary-operation.dto';
import { MATH_BINARY_OPS } from '../enums/math-binary-ops.enum';
import { MATH_BINARY } from '../constants/math.constant';
import { getQueueToken } from '@nestjs/bullmq';

describe('MathController', () => {
  let mathController: MathController;
  let mathBinaryQueue: Queue;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [MathController],
        providers: [
          {
            provide: getQueueToken(MATH_BINARY),
            useValue: {
                add: jest.fn().mockResolvedValue({ id: 'jobId' }),
                process: jest.fn(),
                on: jest.fn()
              }
          },
        ],
    }).compile();

    mathController = moduleRef.get<MathController>(MathController);
    mathBinaryQueue = moduleRef.get<Queue>(getQueueToken(MATH_BINARY));
  });

  describe('sum', () => {
    it('should add job sum to queue and return job id', async () => {
      const dto: BinaryOperationDto = { num1: 2, num2: 3 };
      const jobId = 'jobId';

      (mathBinaryQueue.add as jest.Mock).mockResolvedValue({ id: jobId });
      const result = await mathController.sum(dto);

      expect(mathBinaryQueue.add).toHaveBeenCalledWith(
        MATH_BINARY_OPS.SUM,
        dto
      );
      expect(result).toBe(jobId);
    });

    it('should return empty string if jobId is undefined', async () => {
        const dto: BinaryOperationDto = { num1: 2, num2: 3 };

        (mathBinaryQueue.add as jest.Mock).mockResolvedValue({ id: undefined });
        const result = await mathController.sum(dto);
        expect(result).toBe('')
    });

    it('should handle errors', async () => {
        const dto: BinaryOperationDto = { num1: 2, num2: 3 };

        (mathBinaryQueue.add as jest.Mock).mockRejectedValue(new Error('Error'));

        await expect(mathController.sum(dto)).rejects.toThrow('Error')
    });
  });
});
