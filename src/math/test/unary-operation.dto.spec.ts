import { validate } from "class-validator";
import { UnaryOperationDto } from "../dtos/unary-operation.dto";

describe('UnaryOperationDTO', () => {
    it('should validate valid data', async () => {
        const dto = new UnaryOperationDto();
        dto.num1 = 1;

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should validate non-number data', async () => {
        const dto = new UnaryOperationDto();
        dto.num1 = 'string' as any;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('should validate null data', async () => {
        const dto = new UnaryOperationDto();
        dto.num1 = null;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });
});