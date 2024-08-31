import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUpdatePublisherDto {
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  public name: string;
}
