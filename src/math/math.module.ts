import { Module } from "@nestjs/common";
import { QueueModule } from "../queue-board/queue-board.module";
import { MATH_BINARY, MATH_UNARY } from "./constants/math.constant";
import { MATH_ARRAY_CHILD, MATH_ARRAY_MERGE, MATH_ARRAY_PRODUCER } from "./constants/math-array.constant";
import { MathBinaryOperationProcessor } from "./processors/math-binary-operation.processor";
import { MathController } from "./controllers/math.controller";
import { MathArrayChildProcessor } from "./processors/math-array-child.processor";
import { MathArrayController } from "./controllers/math-array.controller";
import { MathArrayMergeProcessor } from "./processors/math-array-merge.process";
import { ArrayFlowService } from "./services/array-flow.service";
import { MathUnaryOperationProcessor } from "./processors/math-unary-operation-processor.service";

@Module({
    imports: [QueueModule.register({
        queues: [MATH_BINARY, MATH_UNARY, MATH_ARRAY_CHILD, MATH_ARRAY_MERGE],
        flows: [MATH_ARRAY_PRODUCER],
    })],
    providers: [MathBinaryOperationProcessor, MathArrayChildProcessor, MathArrayMergeProcessor, ArrayFlowService, MathUnaryOperationProcessor],
    controllers: [MathController, MathArrayController],
})
export class MathModule{};