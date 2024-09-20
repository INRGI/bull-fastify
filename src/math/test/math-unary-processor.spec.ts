import { Test } from "@nestjs/testing";
import { MathUnaryOperationProcessor } from "../processors/math-unary-operation-processor.service";
import { Job } from "bullmq";
import { MATH_UNARY_OPS } from "../enums/math-unary-ops.enum";
import { BadRequestException } from "@nestjs/common";


describe('MathUnaryProcessor', () =>{
    let processor: MathUnaryOperationProcessor;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [MathUnaryOperationProcessor]
        }).compile();

        processor = moduleRef.get<MathUnaryOperationProcessor>(MathUnaryOperationProcessor);
    });

    it('should return cube value', async () => {
        const job = {
            name: MATH_UNARY_OPS.CUBE,
            data: {num1: 2},
        } as unknown as Job;

        const result = await processor.process(job);
        expect(result).toBe(8);
    });

    it('should return square value', async () => {
        const job = {
            name: MATH_UNARY_OPS.SQUARE,
            data: {num1: 2},
        } as unknown as Job;

        const result = await processor.process(job);
        expect(result).toBe(4);
    });

    it('should return negate value', async () => {
        const job = {
            name: MATH_UNARY_OPS.NEGATE,
            data: {num1: 2},
        } as unknown as Job;

        const result = await processor.process(job);
        expect(result).toBe(-2);
    });

    it('should handle exception error', async () => {
        const job = {
            name: 'UNKNOWN',
            data: {num1: 2},
        } as unknown as Job;

        expect( async () => { await processor.process(job)}).rejects.toThrow(BadRequestException);
    });
});