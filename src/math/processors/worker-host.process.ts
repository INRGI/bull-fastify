import { OnWorkerEvent, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";


export abstract class WorkerHostProcessor extends WorkerHost{
    protected readonly logger = new Logger(WorkerHostProcessor.name);
    
    @OnWorkerEvent('completed')
    onCompleted(job: Job){
        const {id, name, queueName, finishedOn, returnvalue} = job;
        const completedTime = finishedOn ? new Date(finishedOn).toISOString() : '';

        this.logger.log(`Job id: ${id}, name: ${name} completed in queue ${queueName} on ${completedTime}. Result: ${returnvalue}`);
    };

    @OnWorkerEvent('progress')
    onProgress(job: Job){
        const {id, name, progress} = job;
        this.logger.log(`Job id: ${id}, name: ${name} completes ${progress}%`);
    }

    @OnWorkerEvent('failed')
    onFailed(job: Job){
        const {id, name, failedReason, queueName} = job;
        this.logger.error(`Job id: ${id}, name: ${name} failed in queue ${queueName}. Failed reason: ${failedReason}`);

    };

    @OnWorkerEvent('active')
    onActive(job: Job){
        const {id, name, timestamp, queueName} = job;
        const startTime = timestamp ? new Date(timestamp).toISOString() : '';
        this.logger.log(`Job id: ${id}, name: ${name} starts in queue ${queueName} on ${startTime}.`)
    };
}