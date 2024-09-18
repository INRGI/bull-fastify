import { Module } from "@nestjs/common";
import { QueueModule } from "src/queue-board/queue-board.module";
import { MATH_BINARY, MATH_UNARY } from "./constants/math.constant";
import { MATH_ARRAY_CHILD, MATH_ARRAY_MERGE, MATH_ARRAY_PRODUCER } from "./constants/math-array.constant";
import { MathBinaryOperationProcessor } from "./processors/math-binary-operation.processor";
import { MathController } from "./controllers/math.controller";
import { MathArrayChildProcessor } from "./processors/math-array-child.processor";

@Module({
    imports: [QueueModule.register({
        queues: [MATH_BINARY, MATH_UNARY, MATH_ARRAY_CHILD, MATH_ARRAY_MERGE],
        flows: [MATH_ARRAY_PRODUCER],
    })],
    providers: [MathBinaryOperationProcessor, MathArrayChildProcessor],
    controllers: [MathController],
})
export class MathModule{};