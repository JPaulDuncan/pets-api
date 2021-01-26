import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Owners } from './owners.interface';
import { owners } from './db/owner.data';

@ApiTags('Schemas')
@Controller('schema')
export class SchemaController {
  @Get()
  public getSchemas(): Owners {
    return owners;
  }
}
