import { Test, TestingModule } from '@nestjs/testing';
import { MathModule } from '../math.module';
import { ArrayFlowService } from '../services/array-flow.service';
import { getFlowProducerToken } from '@nestjs/bullmq';
import { MATH_ARRAY_PRODUCER } from '../constants/math-array.constant';

jest.mock('bullmq', () => ({
  Queue: jest.fn().mockImplementation(() => ({
    add: jest.fn(),
    getJobCounts: jest.fn(),
  })),
  Worker: jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    close: jest.fn(),
  })),
  FlowProducer: jest.fn().mockImplementation(() => ({
    add: jest.fn(),
    createFlow: jest.fn(),
  })),
}));

describe('MathModule', () => {
  let module: TestingModule;
  let service: ArrayFlowService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [MathModule],
      providers: [
        {
          provide: getFlowProducerToken(MATH_ARRAY_PRODUCER),
          useValue: {
            add: jest.fn(),
            createFlow: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ArrayFlowService>(ArrayFlowService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    return new Promise(resolve => setTimeout(resolve, 0));
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });

  it('should resolve ArrayFlowService', () => {
    expect(service).toBeDefined();
  });
});
