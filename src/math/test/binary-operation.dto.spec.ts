import { validate } from "class-validator";
import { BinaryOperationDto } from "../dtos/binary-operation.dto";


describe('BinaryOperationDTO', () => {
    it('should validate valid data', async () => {
        const dto = new BinaryOperationDto();
        dto.num1 = 1;
        dto.num2 = 2;

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should validate null data', async () => {
        const dto = new BinaryOperationDto();
        dto.num1 = null;
        dto.num2 = 2;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('should validate non-number data', async () => {
        const dto = new BinaryOperationDto();
        dto.num1 = 'string' as any;
        dto.num2 = 2;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });
})
