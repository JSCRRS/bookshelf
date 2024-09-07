import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  public firstName: string;

  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  public lastName: string;

  @IsNotEmpty()
  @IsString()
  public birthDate: string;

  @IsOptional()
  @IsString()
  public cityOfBirth?: string;

  @IsOptional()
  @IsString()
  public countryOfBirth?: string;
}
