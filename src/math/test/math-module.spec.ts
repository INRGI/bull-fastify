import { Test, TestingModule } from '@nestjs/testing';
import { MathModule } from '../math.module';
import { ArrayFlowService } from '../services/array-flow.service';
import { getFlowProducerToken } from '@nestjs/bullmq';
import { MATH_ARRAY_PRODUCER } from '../constants/math-array.constant';
import RedisMock from 'ioredis-mock';

describe('MathModule', () => {
    let module: TestingModule;
    let service: ArrayFlowService;
    const mockRedis = new RedisMock();

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [MathModule],
            providers: [
                {
                    provide: getFlowProducerToken(MATH_ARRAY_PRODUCER),
                    useValue: {
                        add: jest.fn(),
                        process: jest.fn(),
                        on: jest.fn(),
                    },
                },
                {
                    provide: 'REDIS_CLIENT',
                    useValue: mockRedis,
                },
            ],
        }).compile();

        service = module.get<ArrayFlowService>(ArrayFlowService);
    });

    afterEach(async() => {
        jest.clearAllMocks();
        await mockRedis.quit();
    });

    it('should compile the module', () => {
        expect(module).toBeDefined();
    });

    it('should resolve ArrayFlowService', () => {
        expect(service).toBeDefined();
    });
});
