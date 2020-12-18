import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePetsDto {
  @ApiPropertyOptional()
  id: number;

  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  nickName: string;

  @ApiPropertyOptional()
  ownerId: number;

  @ApiPropertyOptional()
  breed: number;
  
  @ApiPropertyOptional()
  size: number;

  @ApiPropertyOptional()
  birthday: number;
  
  @ApiPropertyOptional()
  species: number;
    
  @ApiPropertyOptional()
  po_sync_date: Date;
}
