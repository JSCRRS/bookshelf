import {
  ArrayUnique,
  IsNotEmpty,
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
}
