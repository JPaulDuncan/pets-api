import { ApiProperty } from '@nestjs/swagger';
import { CreatePetsDto } from './create-pets.dto';

export class GetPetsDto {
  @ApiProperty()
  hasNext: boolean;
  
  @ApiProperty({ type: () => [CreatePetsDto] })
  items: Array<CreatePetsDto>;

  @ApiProperty()
  po_sync_date: Date;
}
