import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Owners, OwnersAPI } from './owners.interface';
import { PoSyncDateInterceptor } from 'src/core/interceptor/po-sync-date.interceptor';
import { GetOwnersDto } from './dto/get-owners.dto';
import { QueryApi } from 'src/core/interfaces/query.interface';
import { OwnersService } from './owners.service';

@ApiTags('SchemasSync')
@Controller('schemaSync')
@UseInterceptors(PoSyncDateInterceptor)
export class SchemaSyncController {
  constructor(private ownersService: OwnersService) {}

  @ApiResponse({ status: 200, type: GetOwnersDto })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @Get()
  getSchemas(@Query() query: QueryApi): OwnersAPI {
    const { search, filter, page, pageSize } = query;

    return this.ownersService.getOwners(search || filter, page, pageSize);
  }

  @ApiResponse({ status: 200, type: GetOwnersDto })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiParam({ name: 'date' })
  @Get('/diff/:date')
  ownersDiffDate(
    @Param() param: { date: string },
    @Query() query: QueryApi,
  ): OwnersAPI {
    const { page, pageSize } = query;
    return this.ownersService.ownersDiffDate(param.date, page, pageSize);
  }
}
