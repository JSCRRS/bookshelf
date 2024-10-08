import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUpdateGenreDto {
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  public name: string;
}
