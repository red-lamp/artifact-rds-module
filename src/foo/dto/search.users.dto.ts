import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { ResponseDTO } from 'src/common/dto/response.dto';

export class SearchUsersDTO extends ResponseDTO {
  @IsArray()
  @ApiProperty({
    description: 'user id list',
    type: [],
    example: [],
  })
  usersId: number[];
}
