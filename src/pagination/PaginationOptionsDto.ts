import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationOptionsDto {
  @ApiPropertyOptional({ minimum: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly currentPage?: number = 1;

  @ApiPropertyOptional({ minimum: 10, maximum: 50, default: 25 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(10)
  @Max(50)
  readonly itemsPerPage?: number = 25;

  get skipNumberOfPages(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }
}
