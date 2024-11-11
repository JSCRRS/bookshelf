import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  @ApiProperty({ example: 'Eino' })
  public firstName: string;

  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  @ApiProperty({ example: 'Zemlak' })
  public lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '2003-06-04' })
  public birthDate: string;

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
