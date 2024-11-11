import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateBookDto {
  @ArrayUnique()
  @IsUUID('all', { each: true })
  @ApiProperty({ example: ['16c79f55-3a65-43a7-9ad6-a395ea20f37f'] })
  public authorIds: string[];

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty({ example: 'A Book Title' })
  public title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '2000' })
  public year: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '1992' })
  public yearFirstPublished?: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  public edition: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @ApiProperty({ example: 'English' })
  public language: string;

  @IsNotEmpty()
  @IsUUID('all')
  @ApiProperty({ example: '08ae2052-399b-48a1-8722-32cee96dbede' })
  public publisherId: string;

  @ArrayUnique()
  @IsUUID('all', { each: true })
  @ApiProperty({ example: ['a100cf33-00c5-40d0-bc7f-29144fc53675'] })
  public genreIds: string[];

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Some comment.' })
  public comment?: string;
}
