import { Test, TestingModule } from "@nestjs/testing";
import { MathArrayChildProcessor } from "../processors/math-array-child.processor";
import { MATH_ARRAY_OPS } from "../enums/math-array-ops.enum";
import { Job } from "bullmq";
import { BadRequestException } from "@nestjs/common";


describe('MathArrayChildProcessor', () =>{
    let processor: MathArrayChildProcessor;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            providers:[MathArrayChildProcessor],
        }).compile();
        processor = moduleRef.get<MathArrayChildProcessor>(MathArrayChildProcessor);
    });

    it('should return min value', async () =>{
        const job = {name: MATH_ARRAY_OPS.MIN, data: {data: [3,6,4,2,1]}} as Job;
        expect(await processor.process(job)).toBe(1);
    });
    it('should return max value', async () =>{
        const job = {name: MATH_ARRAY_OPS.MAX, data: {data: [3,6,4,2,1]}} as Job;
        expect(await processor.process(job)).toBe(6);
    });
    it('should return odd value', async () =>{
        const job = {name: MATH_ARRAY_OPS.FILTER_ODD, data: {data: [3,6,4,2,1]}} as Job;
        expect(await processor.process(job)).toEqual([3,1]);
    });
    it('should return even value', async () =>{
        const job = {name: MATH_ARRAY_OPS.FILTER_EVEN, data: {data: [3,6,4,2,1]}} as Job;
        expect(await processor.process(job)).toEqual([6,4,2]);
    });
    it('should throw unknown error', async () =>{
        const job = {name: 'UNKNOWN', data: {data: [3,6,4,2,1]}} as Job;
        await expect( processor.process(job)).rejects.toThrow(BadRequestException);
    });
})