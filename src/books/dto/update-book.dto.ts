import {
  ArrayUnique,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @ArrayUnique()
  @IsUUID('all', { each: true })
  public authorIds?: string[];

  @IsOptional()
  @MaxLength(100)
  @IsString()
  public title?: string;

  @IsOptional()
  @IsString()
  public year?: string;

  @IsOptional()
  @IsString()
  public yearFirstPublished?: string;

  @IsOptional()
  @IsNumber()
  public edition?: number;

  @IsOptional()
  @MaxLength(20)
  @IsString()
  public language?: string;

  @IsOptional()
  @IsUUID('all')
  public publisherId?: string;

  @IsOptional()
  @ArrayUnique()
  @IsUUID('all', { each: true })
  public genreIds?: string[];

  @IsOptional()
  @IsString()
  public comment?: string;
}
