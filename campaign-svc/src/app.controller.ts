import { Controller, Get , Post} from '@nestjs/common';
import { AppService } from './app.service';
import { KnexService } from './knex.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly knexService: KnexService,
  ) {}

  @Get('/health')
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post('/database-init')
  async init(): Promise<string> {
    return this.knexService.init();
  }
}
