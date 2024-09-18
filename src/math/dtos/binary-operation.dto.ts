import { IsNumber } from "class-validator";

export class BinaryOperationDto{
    @IsNumber()
    num1: number;

    @IsNumber()
    num2: number;
}