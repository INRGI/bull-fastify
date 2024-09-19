import { Body, Controller, Post } from "@nestjs/common";
import { InjectMathBinaryQueue } from "../decorators/inject-queue.decorator";
import { Queue } from "bullmq";
import { BinaryOperationDto } from "../dtos/binary-operation.dto";
import { MATH_BINARY_OPS } from "../enums/math-binary-ops.enum";

@Controller('math')
export class MathController{
    constructor(@InjectMathBinaryQueue() private mathBinaryQueue: Queue){}

    @Post('sum')
    async sum(@Body() dto: BinaryOperationDto):Promise<string>{
        const job = await this.mathBinaryQueue.add(MATH_BINARY_OPS.SUM, dto);
        return job.id || '';
    };
};