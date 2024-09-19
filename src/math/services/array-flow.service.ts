import { Injectable } from "@nestjs/common";
import { InjectMathArrayProducer } from "../decorators/inject-flow-producer.decorator";
import { FlowChildJob, FlowProducer } from "bullmq";
import { ArrayOperationDto } from "../dtos/array-operation.dto";
import { MATH_ARRAY_OPS } from "../enums/math-array-ops.enum";
import { MATH_ARRAY_CHILD, MATH_ARRAY_MERGE } from "../constants/math-array.constant";

const PARTITION_SIZE = 4;

@Injectable()
export class ArrayFlowService{
    constructor(@InjectMathArrayProducer() private mathFlowProducer: FlowProducer){};

    async createFlow(dto: ArrayOperationDto, jobName: MATH_ARRAY_OPS): Promise<string>{
        const flow = await this.mathFlowProducer.add({
            name: jobName,
            queueName: MATH_ARRAY_MERGE,
            children: this.createChildrenJobs(dto, jobName),
        });
        return flow.job.id || '';
    };

    private createChildrenJobs(dto: ArrayOperationDto, jobName: MATH_ARRAY_OPS){
        const numPartitions = Math.ceil(dto.data.length / PARTITION_SIZE);
        let startIdx = 0;

        const children: FlowChildJob[] = [];
        for (let i = 0; i < numPartitions - 1; i++){
            children.push({
                name: jobName,
                data: {
                    data: dto.data.slice(startIdx, startIdx + PARTITION_SIZE),
                    percentage: (100/ numPartitions) * (i + 1),
                },
                queueName: MATH_ARRAY_CHILD
            });
            startIdx = startIdx + PARTITION_SIZE;
        }

        children.push({
            name: jobName,
            data: { data: dto.data.slice(startIdx), percentage: 100},
            queueName: MATH_ARRAY_CHILD,
        });

        return children;
    };
};