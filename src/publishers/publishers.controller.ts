import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PublishersService } from './publishers.service';
import { CreateUpdatePublisherDto } from './dto/create-update-gerne.dto';
import { Publisher } from './publisher.entity';

@ApiTags('Publishers')
@Controller('/publishers')
export class PublishersController {
  constructor(private readonly service: PublishersService) {}

  @ApiOperation({ summary: 'Create a new publisher.' })
  @ApiResponse({ status: 201, description: 'New publisher created.' })
  @Post()
  public createPublisher(
    @Body() publisher: CreateUpdatePublisherDto,
  ): Promise<Publisher> {
    return this.service.createPublisher(publisher);
  }
}
