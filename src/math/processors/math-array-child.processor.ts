import { Processor } from '@nestjs/bullmq';
import { MATH_ARRAY_CHILD } from '../constants/math-array.constant';
import { BadRequestException, Injectable } from '@nestjs/common';
import { WorkerHostProcessor } from './worker-host.process';
import { Job } from 'bullmq';
import { ComparisonJobProgress } from '../interfaces/job-progress.interface';
import { MATH_ARRAY_OPS } from '../enums/math-array-ops.enum';

@Processor(MATH_ARRAY_CHILD)
@Injectable()
export class MathArrayChildProcessor extends WorkerHostProcessor {
  async process(
    job: Job<ComparisonJobProgress, number | number[], string>,
  ): Promise<number | number[]> {
    switch(job.name){
        case MATH_ARRAY_OPS.MIN:
            return Math.min(...job.data.data);
        case MATH_ARRAY_OPS.MAX:
            return Math.max(...job.data.data);
        case MATH_ARRAY_OPS.FILTER_ODD:
            return job.data.data.filter((n) => n % 2 === 1);
        case MATH_ARRAY_OPS.FILTER_EVEN:
            return job.data.data.filter((n) => n % 2 === 0);
    }

    throw new BadRequestException(`Unknown job name ${job.name} found in queue ${job.queueName}`);
  }
}
