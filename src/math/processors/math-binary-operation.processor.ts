import { Processor } from "@nestjs/bullmq";
import { MATH_BINARY } from "../constants/math.constant";
import { BadRequestException, Injectable } from "@nestjs/common";
import { WorkerHostProcessor } from "./worker-host.process";
import { Job } from "bullmq";
import { BinaryOperationDto } from "../dtos/binary-operation.dto";
import { MATH_BINARY_OPS } from "../enums/math-binary-ops.enum";


@Processor(MATH_BINARY)
@Injectable()
export class MathBinaryOperationProcessor extends WorkerHostProcessor{
    process(job: Job<BinaryOperationDto, number, string>): Promise<number> {
        const {num1, num2} = job.data;
        switch(job.name){
            case MATH_BINARY_OPS.SUM:
                return Promise.resolve(num1 + num2);
        }
        throw new BadRequestException(`Unknown job name: ${job.name}`);
    }
}