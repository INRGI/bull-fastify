import { validate } from "class-validator";
import { ArrayOperationDto } from "../dtos/array-operation.dto";

describe('ArrayOperationDTO', () => {
    it('should validate valid data', async () => {
        const dto = new ArrayOperationDto();
        dto.data = [1,2,3];

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should validate empty array', async () => {
        const dto = new ArrayOperationDto();
        dto.data = [];

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('should validate non-array', async () => {
        const dto = new ArrayOperationDto();
        dto.data = null;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });
});