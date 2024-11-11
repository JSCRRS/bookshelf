import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateAuthorDto {
  @IsOptional()
  @MaxLength(50)
  @IsString()
  @ApiProperty({ example: 'Eino' })
  public firstName?: string;

  @IsOptional()
  @MaxLength(50)
  @IsString()
  @ApiProperty({ example: 'Zemlak' })
  public lastName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '2003-06-04' })
  public birthDate?: string;

  @IsOptional()
  @MaxLength(20)
  @IsString()
  @ApiProperty({ example: 'Hermistonside' })
  public cityOfBirth?: string;

  @IsOptional()
  @MaxLength(50)
  @IsString()
  @ApiProperty({ example: 'Canada' })
  public countryOfBirth?: string;
}
