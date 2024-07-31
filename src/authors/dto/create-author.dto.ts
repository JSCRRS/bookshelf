import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  public name: string;
}
