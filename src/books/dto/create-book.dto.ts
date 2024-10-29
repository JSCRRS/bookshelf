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
  public authorIds: string[];

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public title: string;

  @IsNotEmpty()
  @IsString()
  public year: string;

  @IsOptional()
  @IsString()
  public yearFirstPublished?: string;

  @IsNotEmpty()
  @IsNumber()
  public edition: number;
}
