import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateBookDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    year: number;
}