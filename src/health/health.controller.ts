import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('Health Checks')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
  ) {}

  @ApiOperation({ summary: 'Checks if API is up and running.' })
  @ApiResponse({
    status: 200,
    description: 'API is up and running.',
  })
  @Get()
  @HealthCheck()
  healthCheck() {
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
    ]);
  }

  @ApiOperation({ summary: 'Checks if database is up and running.' })
  @ApiResponse({
    status: 200,
    description: 'Database is up and running.',
  })
  @Get('db')
  @HealthCheck()
  checkdb() {
    return this.health.check([() => this.db.pingCheck('books')]);
  }
}
