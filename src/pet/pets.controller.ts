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
  Pet,
  Pets,
  PetsAPI,
} from './pets.interface';

import { PetsService } from './pets.service';

import { CreatePetsDto } from './dto/create-pets.dto';
import { GetPetsDto } from "./dto/get-pets.dto";

@ApiTags('Pets')
@Controller('pet')
export class PetsController {
  constructor(private petsService: PetsService) {}

  @ApiResponse({ status: 200, type: GetPetsDto })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @Get()
  getPets(@Query() query: QueryApi): PetsAPI {
    const { search, filter, page, pageSize } = query;

    return this.petsService.getPets(
      search || filter,
      page,
      pageSize,
    );
  }

  @Get('count')
  getCount(): Count {
    return this.petsService.getCount();
  }

  @ApiResponse({ status: 204 })
  @Delete()
  deletePets(@Body() body: Pets): void {
    this.petsService.deleteAll(body);
  }

  @ApiResponse({ status: 200, type: CreatePetsDto })
  @ApiParam({ name: 'id' })
  @Get(':id')
  getPet(@Param() params: ParamQueryId): Pet {
    return this.petsService.getPet(params['id']);
  }

  @ApiResponse({ status: 200 })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  deletePet(@Param() params: ParamQueryId): any {
    return this.petsService.delete(params['id']);
  }

  @ApiResponse({ status: 201, type: CreatePetsDto })
  @ApiBody({ type: CreatePetsDto })
  @Post()
  save(@Body() pet: Pet): Pet {
    return this.petsService.save(pet);
  }

  @ApiResponse({ status: 201, type: CreatePetsDto })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: CreatePetsDto })
  @Put(':id')
  update(@Body() pets: Pet, @Param() param: ParamQueryId): void {
    this.petsService.update(param['id'], pets);
  }

  @ApiResponse({ status: 200, type: GetPetsDto })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiParam({ name: 'date' })
  @Get('/diff/:date')
  petsDiffDate(
    @Param() param: { date: string },
    @Query() query: QueryApi,
  ): PetsAPI {
    const { page, pageSize } = query;
    return this.petsService.petsDiffDate(
      param.date,
      page,
      pageSize,
    );
  }
}
