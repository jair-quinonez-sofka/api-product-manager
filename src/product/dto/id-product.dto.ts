import { IsUUID } from "class-validator";

export class IDProductDTO {
    @IsUUID()
    id: string;
}