import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PaginationMetaInformationDto } from './PaginationMetaInformationDto';

export class PaginationDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => PaginationMetaInformationDto })
  readonly metaInformation: PaginationMetaInformationDto;

  constructor(data: T[], metaInformation: PaginationMetaInformationDto) {
    this.data = data;
    this.metaInformation = metaInformation;
  }
}
