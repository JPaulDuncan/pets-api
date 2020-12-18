import { ApiProperty } from '@nestjs/swagger';
import { CreateOwnersDto } from './create-owners.dto';

export class GetOwnersDto {
  @ApiProperty()
  hasNext: boolean;
  
  @ApiProperty({ type: () => [CreateOwnersDto] })
  items: Array<CreateOwnersDto>;

  @ApiProperty()
  po_sync_date: Date;
}
