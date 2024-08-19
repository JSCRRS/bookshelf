import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDtoParameters } from './PaginationMetaDtoParameters';

export class PaginationMetaInformationDto {
  @ApiProperty()
  readonly currentPage: number;

  @ApiProperty()
  readonly itemsPerPage: number;

  @ApiProperty()
  readonly numberOfAllItems: number;

  @ApiProperty()
  readonly numberOfAllPages: number;

  constructor({
    paginationOptionsDto,
    numberOfAllItems,
  }: PaginationMetaDtoParameters) {
    (this.currentPage = paginationOptionsDto.currentPage),
      (this.itemsPerPage = paginationOptionsDto.itemsPerPage);
    this.numberOfAllItems = numberOfAllItems;
    this.numberOfAllPages = Math.ceil(
      this.numberOfAllItems / this.itemsPerPage,
    );
  }
}
