import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDTO } from './create-product.dto';
import {
    IsString,
    IsNumber,
    IsInt,
    IsNotEmpty,
    IsPositive,
    MinLength,
    IsOptional
} from 'class-validator'
import { IDProductDTO } from './id-product.dto';

export class UpdateProductDTO extends IDProductDTO {

    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'name must be at least 3 characters long' })
    @IsOptional()
    name?: string;

    @IsString({ message: 'description must be a string' })
    @IsNotEmpty({ message: 'description must not be empty' })
    @MinLength(10, { message: 'description must be at least 10 characters long' })
    @IsOptional()

    description?: string;

    @IsNumber()
    @IsPositive({ message: 'price must be a positive number' })
    @IsOptional()
    price?: number;

    @IsInt({ message: 'stock must be an integer' })
    @IsPositive({ message: 'stock must be a positive number' })
    @IsOptional()
    stock?: number;

}
