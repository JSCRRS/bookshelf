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

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  public language: string;

  @ArrayUnique()
  @IsUUID('all', { each: true })
  public genreIds: string[];

  @IsOptional()
  @IsString()
  public comment?: string;
}
