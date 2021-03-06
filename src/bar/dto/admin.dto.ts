import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { ResponseDTO } from 'src/common/dto/response.dto';

export class AdminDTO extends ResponseDTO {
  @IsArray()
  @ApiProperty({
    description: 'admin list',
    type: [],
    example: [],
  })
  admins: any[];
}
