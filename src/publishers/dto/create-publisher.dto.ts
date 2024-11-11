import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePublisherDto {
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  @ApiProperty({ example: 'faber' })
  public name: string;

  @IsOptional()
  @MaxLength(20)
  @IsString()
  @ApiProperty({ example: 'Copenhagen' })
  public city?: string;

  @IsOptional()
  @MaxLength(50)
  @IsString()
  @ApiProperty({ example: 'Denmark' })
  public country?: string;
}
