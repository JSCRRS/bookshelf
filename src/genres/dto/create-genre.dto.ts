import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateGenreDto {
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  public name: string;
}
