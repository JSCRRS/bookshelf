import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUpdateGenreDto {
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  @ApiProperty({ example: 'Crime' })
  public name: string;
}
