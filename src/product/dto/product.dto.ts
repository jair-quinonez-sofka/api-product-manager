import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, Min, MinLength } from "class-validator";

export class ProductDTO {
    
    id: string
    name: string;
    description: string;
    price: number;
    stock: number;
}