import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOwnersDto {
  @ApiPropertyOptional()
  id: number;

  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  phone: string;

  @ApiPropertyOptional()
  address: string;
  
  @ApiPropertyOptional()
  birthday: number;
    
  @ApiPropertyOptional()
  po_sync_date: Date;
}
