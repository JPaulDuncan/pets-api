import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Count } from 'src/core/interfaces/collection.interface';

import { ParamQueryId, QueryApi } from 'src/core/interfaces/query.interface';

import {
  Owner,
  Owners,
  OwnersAPI,
} from './owners.interface';

import { OwnersService } from './owners.service';

import { CreateOwnersDto } from './dto/create-owners.dto';
import { GetOwnersDto } from "./dto/get-owners.dto";
import { Pets, PetsAPI } from 'src/pet/pets.interface';

@ApiTags('Owners')
@Controller('owner')
export class OwnersController {
  constructor(private ownersService: OwnersService) {}

  @ApiResponse({ status: 200, type: GetOwnersDto })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @Get()
  getOwners(@Query() query: QueryApi): OwnersAPI {
    const { search, filter, page, pageSize } = query;

    return this.ownersService.getOwners(
      search || filter,
      page,
      pageSize,
    );
  }

  @Get('count')
  getCount(): Count {
    return this.ownersService.getCount();
  }

  @ApiResponse({ status: 204 })
  @Delete()
  deleteOwners(@Body() body: Owners): void {
    this.ownersService.deleteAll(body);
  }

  @ApiResponse({ status: 200, type: CreateOwnersDto })
  @ApiParam({ name: 'id' })
  @Get(':id/pets')
  getOwnerPets(@Param() params: ParamQueryId): PetsAPI {
    return this.ownersService.getOwnerPets(params['id']);
  }

  @ApiResponse({ status: 200, type: CreateOwnersDto })
  @ApiParam({ name: 'id' })
  @Get(':id')
  getOwner(@Param() params: ParamQueryId): Owner {
    return this.ownersService.getOwner(params['id']);
  }

  @ApiResponse({ status: 200 })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  deleteOwner(@Param() params: ParamQueryId): any {
    return this.ownersService.delete(params['id']);
  }

  @ApiResponse({ status: 201, type: CreateOwnersDto })
  @ApiBody({ type: CreateOwnersDto })
  @Post()
  save(@Body() owner: Owner): Owner {
    return this.ownersService.save(owner);
  }

  @ApiResponse({ status: 201, type: CreateOwnersDto })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: CreateOwnersDto })
  @Put(':id')
  update(@Body() owners: Owner, @Param() param: ParamQueryId): void {
    this.ownersService.update(param['id'], owners);
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
    return this.ownersService.ownersDiffDate(
      param.date,
      page,
      pageSize,
    );
  }
}
