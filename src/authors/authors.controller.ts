import { Controller, Get } from '@nestjs/common';
import { AuthorsService } from './authors.service';

@Controller()
export class AuthorsController {
  constructor(private readonly appService: AuthorsService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
