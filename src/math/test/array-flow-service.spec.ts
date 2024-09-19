import { FlowProducer } from 'bullmq';
import { ArrayFlowService } from '../services/array-flow.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ArrayOperationDto } from '../dtos/array-operation.dto';
import { MATH_ARRAY_OPS } from '../enums/math-array-ops.enum';
import {
  MATH_ARRAY_CHILD,
  MATH_ARRAY_MERGE,
  MATH_ARRAY_PRODUCER,
} from '../constants/math-array.constant';
import { getFlowProducerToken } from '@nestjs/bullmq';
import redisMock from 'ioredis-mock';

describe('Array-Flow-Service', () => {
  let mathFlowProducer: FlowProducer;
  let service: ArrayFlowService;

  beforeEach(async () => {
    const mockRedis = new redisMock();

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ArrayFlowService,
        {
          provide: getFlowProducerToken(MATH_ARRAY_PRODUCER),
          useValue: {
            add: jest.fn(),
            process: jest.fn(),
            on: jest.fn(),
            redis: mockRedis,
          },
        },
      ],
    }).compile();

    service = moduleRef.get<ArrayFlowService>(ArrayFlowService);
    mathFlowProducer = moduleRef.get<FlowProducer>(
      getFlowProducerToken(MATH_ARRAY_PRODUCER),
    );
  });

  describe('createFlow', () => {
    it('should create flow and return job id', async () => {
      const dto: ArrayOperationDto = { data: [1, 2, 3, 4, 5, 6, 7, 8] };
      const jobName = MATH_ARRAY_OPS.MAX;
      const mockFlow = { job: { id: 'jobId' } };

      jest.spyOn(mathFlowProducer, 'add').mockResolvedValue(mockFlow as any);

      const result = await service.createFlow(dto, jobName);

      expect(mathFlowProducer.add).toHaveBeenCalledWith({
        name: jobName,
        queueName: MATH_ARRAY_MERGE,
        children: expect.any(Array),
      });

      expect(result).toBe('jobId');
    });
  });

  describe('createChildrenJobs', () => {
    it('should create correct children job', async () => {
      const dto: ArrayOperationDto = { data: [1, 2, 3, 4, 5, 6, 7, 8] };
      const jobName = MATH_ARRAY_OPS.MAX;

      const result = service['createChildrenJobs'](dto, jobName);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        name: jobName,
        data: { data: [1, 2, 3, 4], percentage: 50 },
        queueName: MATH_ARRAY_CHILD,
      });
      expect(result[1]).toEqual({
        name: jobName,
        data: { data: [5, 6, 7, 8], percentage: 100 },
        queueName: MATH_ARRAY_CHILD,
      });
    });
  });
});
