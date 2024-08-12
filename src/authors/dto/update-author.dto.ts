import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateAuthorDto {
  @IsOptional()
  @MaxLength(50)
  @IsString()
  public firstName: string;

  @IsOptional()
  @MaxLength(50)
  @IsString()
  public lastName: string;
}
