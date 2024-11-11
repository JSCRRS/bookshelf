import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePublisherDto {
  @IsOptional()
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
