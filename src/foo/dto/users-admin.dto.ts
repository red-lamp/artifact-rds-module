import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { ResponseDTO } from 'src/common/dto/response.dto';

export class UsersAdminsDTO extends ResponseDTO {
  @IsArray()
  @ApiProperty({
    description: 'user list',
    type: [],
    example: [],
  })
  users: any[];

  @IsArray()
  @ApiProperty({
    description: 'admin list',
    type: [],
    example: [],
  })
  admins: any[];

  @IsNumber()
  @ApiProperty({
    description: 'Total user, admin list',
    type: Number,
    example: 10,
  })
  totalItems: number;
}
