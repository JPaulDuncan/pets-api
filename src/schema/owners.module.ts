import { Module } from '@nestjs/common';
import { PetsService } from 'src/pet/pets.service';
import { SchemaController } from './owners.controller';
import { OwnersService } from './owners.service';
import { SchemaSyncController } from './schema.controller';

@Module({
  controllers: [SchemaController, SchemaSyncController],
  providers: [OwnersService, PetsService],
})
export class SchemasModule {}
