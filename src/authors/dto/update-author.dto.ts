import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateAuthorDto {
  @IsOptional()
  @MaxLength(50)
  @IsString()
  public firstName?: string;

  @IsOptional()
  @MaxLength(50)
  @IsString()
  public lastName?: string;

  @IsOptional()
  @IsString()
  public birthDate?: string;

  @IsOptional()
  @MaxLength(20)
  @IsString()
  public cityOfBirth?: string;

  @IsOptional()
  @MaxLength(50)
  @IsString()
  public countryOfBirth?: string;
}
