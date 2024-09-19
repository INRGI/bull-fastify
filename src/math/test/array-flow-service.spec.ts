import { FlowProducer } from 'bullmq';
import { ArrayFlowService } from '../services/array-flow.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ArrayOperationDto } from '../dtos/array-operation.dto';
import { MATH_ARRAY_OPS } from '../enums/math-array-ops.enum';
import {
  MATH_ARRAY_MERGE,
  MATH_ARRAY_PRODUCER,
} from '../constants/math-array.constant';
import { getQueueToken } from '@nestjs/bullmq';

describe('Array-Flow-Service', () => {
  let mathFlowProducer: FlowProducer;
  let service: ArrayFlowService;

  beforeEach(async () => {

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ArrayFlowService,
        {
            // BullFlowProducer_math-array-producer (works fine)
          provide: getQueueToken(MATH_ARRAY_PRODUCER),
          useValue: {
            add: jest.fn(),
            process: jest.fn(),
            on: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<ArrayFlowService>(ArrayFlowService);
    mathFlowProducer = moduleRef.get<FlowProducer>(getQueueToken(MATH_ARRAY_PRODUCER));
  });

  describe('createFlow', () => {
    it('should create flow and return job id', async () => {
      const dto: ArrayOperationDto = { data: [1, 2, 3, 4, 5, 6] };
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

  describe('createChildrenJobs', () => {});
});
