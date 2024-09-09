import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePublisherDto {
  @IsOptional()
  @MaxLength(100)
  @IsString()
  public name: string;

  @IsOptional()
  @MaxLength(20)
  @IsString()
  public city?: string;

  @IsOptional()
  @MaxLength(50)
  @IsString()
  public country?: string;
}
