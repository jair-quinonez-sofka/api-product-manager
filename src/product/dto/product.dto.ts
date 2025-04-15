import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, Min, MinLength } from "class-validator";

export class ProductDTO {
    @IsUUID()
    id: string

    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'name must be at least 3 characters long' })
    name: string;

    @IsString({ message: 'description must be a string' })
    @IsNotEmpty({ message: 'description must not be empty' })
    @MinLength(10, { message: 'description must be at least 10 characters long' })
    description: string;
    
    @IsNumber()
    @IsPositive({ message: 'price must be a positive number' })
    price: number;

    @IsInt({ message: 'stock must be an integer' })
    @IsPositive({ message: 'stock must be a positive number' })
    stock: number;
}