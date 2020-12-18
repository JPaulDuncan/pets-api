import { Module } from '@nestjs/common';
import { PetsService } from 'src/pet/pets.service';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';

@Module({
  controllers: [OwnersController],
  providers: [OwnersService, PetsService]
})
export class OwnersModule {}
