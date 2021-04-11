import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { ResponseDTO } from 'src/common/dto/response.dto';

export class ProjectDTO extends ResponseDTO {
  @IsArray()
  @ApiProperty({
    description: 'project list',
    type: [],
    example: [],
  })
  projects: any[];
}
