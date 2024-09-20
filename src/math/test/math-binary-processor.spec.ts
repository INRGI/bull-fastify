import { Test } from '@nestjs/testing';
import { MathBinaryOperationProcessor } from '../processors/math-binary-operation.processor';
import { MATH_BINARY_OPS } from '../enums/math-binary-ops.enum';
import { Job } from 'bullmq';
import { BadRequestException } from '@nestjs/common';

describe('MathBinaryProcessor', () => {
  let processor: MathBinaryOperationProcessor;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MathBinaryOperationProcessor],
    }).compile();

    processor = moduleRef.get<MathBinaryOperationProcessor>(
      MathBinaryOperationProcessor,
    );
  });

  it('should return sum', async () => {
    const job = {
      name: MATH_BINARY_OPS.SUM,
      data: {
        num1: 1,
        num2: 2,
      },
    } as unknown as Job;

    const result = await processor.process(job);
    expect(result).toEqual(3);
  });

  it('should handle exception', async () => {
    const job = {
      name: 'unknown',
      data: {
        num1: 1,
        num2: 2,
      },
    } as unknown as Job;
    expect(async() => {await processor.process(job)}).rejects.toThrow(BadRequestException);
  });
});
