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
  @MaxLength(20)
  @IsString()
  public cityOfBirth?: string;

  @IsOptional()
  @MaxLength(50)
  @IsString()
  public countryOfBirth?: string;
}
