import { Body, Controller, Post } from "@nestjs/common";
import { ArrayFlowService } from "../services/array-flow.service";
import { ArrayOperationDto } from "../dtos/array-operation.dto";
import { MATH_ARRAY_OPS } from "../enums/math-array-ops.enum";

@Controller('math-array')
export class MathArrayController{
    constructor(private arrayFlowService: ArrayFlowService){}

    @Post('min')
    async findMin(@Body() dto: ArrayOperationDto): Promise<string>{
        return this.arrayFlowService.createFlow(dto, MATH_ARRAY_OPS.MIN);
    };

    @Post('max')
    async findMax(@Body() dto: ArrayOperationDto): Promise<string>{
        return this.arrayFlowService.createFlow(dto, MATH_ARRAY_OPS.MAX);
    }
}