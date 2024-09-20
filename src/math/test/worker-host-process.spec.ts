import { Test } from "@nestjs/testing";
import { WorkerHostProcessor } from "../processors/worker-host.process";
import { Job } from "bullmq";
import { Logger } from "@nestjs/common";


describe('WorkerHostProcessor', () =>{
    class TestWorkerHostProcessor extends WorkerHostProcessor{
        async process(job: Job): Promise<void> {}
    };
    let processor: TestWorkerHostProcessor;
    let logger: jest.SpyInstance;
    let loggerError: jest.SpyInstance;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [TestWorkerHostProcessor],
        }).compile();

        processor = moduleRef.get<TestWorkerHostProcessor>(TestWorkerHostProcessor);
        logger = jest.spyOn(Logger.prototype, 'log').mockImplementation();
        loggerError = jest.spyOn(Logger.prototype, 'error').mockImplementation();
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should log completed the job', () => {
        const job = {
            id: '1',
            name: 'test-job',
            queueName: 'test-queue',
            finishedOn: Date.now(),
            returnvalue: 42,
          } as unknown as Job;

          processor.onCompleted(job);
          expect(logger).toHaveBeenCalledWith(expect.stringContaining('Job id: 1, name: test-job completed in queue test-queue'))
    });

    it('should log progress the job', () => {
        const job = {
            id: '1',
            name: 'test-job',
            queueName: 'test-queue',
            progress: 50
          } as unknown as Job;

          processor.onProgress(job);
          expect(logger).toHaveBeenCalledWith(expect.stringContaining('Job id: 1, name: test-job completes 50%'))
    });

    it('should log failed the job', () => {
        const job = {
            id: '1',
            name: 'test-job',
            queueName: 'test-queue',
            failedReason: 'error',
          } as unknown as Job;

          processor.onFailed(job);
          expect(loggerError).toHaveBeenCalledWith(expect.stringContaining('Job id: 1, name: test-job failed in queue test-queue. Failed reason: error'))
    });
    it('should log active the job', () => {
        const job = {
            id: '1',
            name: 'test-job',
            queueName: 'test-queue',
            timestamp: Date.now(),
          } as unknown as Job;

          processor.onActive(job);
          expect(logger).toHaveBeenCalledWith(expect.stringContaining('Job id: 1, name: test-job starts in queue test-queue on '))
    });
});