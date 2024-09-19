import { Test, TestingModule } from '@nestjs/testing';
import { MathArrayController } from '../controllers/math-array.controller';
import { ArrayFlowService } from '../services/array-flow.service';
import { ArrayOperationDto } from '../dtos/array-operation.dto';
import { MATH_ARRAY_OPS } from '../enums/math-array-ops.enum';

describe('Math-ArrayController', () => {
  let mathArrayController: MathArrayController;
  let arrayFlowService: ArrayFlowService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [MathArrayController],
      providers: [
        {
          provide: ArrayFlowService,
          useValue: {
            createFlow: jest.fn(),
          },
        },
      ],
    }).compile();
    mathArrayController =
      moduleRef.get<MathArrayController>(MathArrayController);
    arrayFlowService = moduleRef.get<ArrayFlowService>(ArrayFlowService);
  });

  describe('findMin', () => {
    it('should call createFlow with MIN operation and return result', async () => {
      const dto: ArrayOperationDto = { data: [1, 2, 3] };
      const result = 'flowId123';

      jest.spyOn(arrayFlowService, 'createFlow').mockResolvedValue(result);

      expect(await mathArrayController.findMin(dto)).toBe(result);
      expect(arrayFlowService.createFlow).toHaveBeenCalledWith(
        dto,
        MATH_ARRAY_OPS.MIN,
      );
    });
  });

  describe('findMax', () => {
    it('should call createFlow with MAX operation and return result', async () => {
      const dto: ArrayOperationDto = { data: [1, 2, 3] };
      const result = 'flowId456';

      jest.spyOn(arrayFlowService, 'createFlow').mockResolvedValue(result);

      expect(await mathArrayController.findMax(dto)).toBe(result);
      expect(arrayFlowService.createFlow).toHaveBeenCalledWith(
        dto,
        MATH_ARRAY_OPS.MAX,
      );
    });
  });

  describe('findMin - error handling', () => {
    it('should throw an error', async () => {
      const dto: ArrayOperationDto = { data: [1, 2, 3] };
      const error = 'An error';

      jest
        .spyOn(arrayFlowService, 'createFlow')
        .mockRejectedValue(new Error(error));

      await expect(mathArrayController.findMin(dto)).rejects.toThrow(error);
    });
  });

  describe('findMax - error handling', () => {
    it('should throw an error', async () => {
      const dto: ArrayOperationDto = { data: [1, 2, 3] };
      const error = 'An error';

      jest
        .spyOn(arrayFlowService, 'createFlow')
        .mockRejectedValue(new Error(error));

      await expect(mathArrayController.findMax(dto)).rejects.toThrow(error);
    });
  });

  describe('findMin with empty data', () => {
    it('should handle empty array', async () => {
      const dto: ArrayOperationDto = { data: [] };
      const result = 'emptyFlowId';

      jest.spyOn(arrayFlowService, 'createFlow').mockResolvedValue(result);
      expect(await mathArrayController.findMin(dto)).toBe(result);
      expect(arrayFlowService.createFlow).toHaveBeenCalledWith(
        dto,
        MATH_ARRAY_OPS.MIN,
      );
    });
  });

  describe('findMax with empty data', () => {
    it('should handle empty array', async () => {
      const dto: ArrayOperationDto = { data: [] };
      const result = 'emptyFlowId';

      jest.spyOn(arrayFlowService, 'createFlow').mockResolvedValue(result);
      expect(await mathArrayController.findMax(dto)).toBe(result);
      expect(arrayFlowService.createFlow).toHaveBeenCalledWith(
        dto,
        MATH_ARRAY_OPS.MAX,
      );
    });
  });

  describe('findMin with large data array', () => {
    it('should handle a large data array', async () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i);
      const dto: ArrayOperationDto = { data: largeArray };
      const result = 'largeFlowId';

      jest.spyOn(arrayFlowService, 'createFlow').mockResolvedValue(result);
      expect(await mathArrayController.findMin(dto)).toBe(result);
      expect(arrayFlowService.createFlow).toHaveBeenCalledWith(
        dto,
        MATH_ARRAY_OPS.MIN,
      );
    });
  });

  describe('findMax with large data array', () => {
    it('should handle a large data array', async () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i);
      const dto: ArrayOperationDto = { data: largeArray };
      const result = 'largeFlowId';

      jest.spyOn(arrayFlowService, 'createFlow').mockResolvedValue(result);
      expect(await mathArrayController.findMax(dto)).toBe(result);
      expect(arrayFlowService.createFlow).toHaveBeenCalledWith(
        dto,
        MATH_ARRAY_OPS.MAX,
      );
    });
  });
});
