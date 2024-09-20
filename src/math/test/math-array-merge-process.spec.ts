import { Test } from "@nestjs/testing";
import { MathArrayMergeProcessor } from "../processors/math-array-merge.process";
import { MATH_ARRAY_OPS } from "../enums/math-array-ops.enum";
import { Job } from "bullmq";
import { BadRequestException } from "@nestjs/common";


describe('MathArrayMergeProcess', () => {
    let processor: MathArrayMergeProcessor;

    beforeEach(async () =>{
        const moduleRef = await Test.createTestingModule({
            providers: [MathArrayMergeProcessor]
        }).compile();

        processor = moduleRef.get<MathArrayMergeProcessor>(MathArrayMergeProcessor)
    });

    it('should return min value', async () =>{
        const job = {
            name: MATH_ARRAY_OPS.MIN,
            getChildrenValues: jest.fn().mockResolvedValue({
                child1: 3,
                child2: 8,
                child3: 2,
            })
        } as unknown as Job;

        const result = await processor.process(job);
        expect(result).toEqual(2);
    });

    it('should return max value', async () =>{
        const job = {
            name: MATH_ARRAY_OPS.MAX,
            getChildrenValues: jest.fn().mockResolvedValue({
                child1: 3,
                child2: 8,
                child3: 2,
            })
        } as unknown as Job;

        const result = await processor.process(job);
        expect(result).toEqual(8);
    });
    
    it('should flat array for odd and even', async () =>{
        const job = {
            name: MATH_ARRAY_OPS.FILTER_ODD,
            getChildrenValues: jest.fn().mockResolvedValue({
                child1: [1,3],
                child2: [5, 7],
            })
        } as unknown as Job;

        const result = await processor.process(job);
        expect(result).toEqual([1,3,5,7]);
    });
    it('should return exception', async () =>{
        const job = {
            name: 'UNKNOWN',
            getChildrenValues: jest.fn().mockResolvedValue({
                child1: [1,3],
                child2: [5, 7],
            })
        } as unknown as Job;

        await expect(processor.process(job)).rejects.toThrow(BadRequestException);
    });
});