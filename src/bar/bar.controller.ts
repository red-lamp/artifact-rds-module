import { BadRequestException, Controller, Get, Logger } from '@nestjs/common';
import { AdminsDTO } from './dto/admin.dto';
import { BarService } from './bar.service';

@Controller()
export class BarController {
  constructor(private readonly fooService: BarService) {}

  @Get('/admins')
  getAdmins(): Promise<AdminsDTO> {
    return this.fooService
      .getAdmins()
      .then((data) => {
        const adminsDTO = new AdminsDTO();
        adminsDTO.admin = data;

        return adminsDTO;
      })
      .catch((err) => {
        Logger.error(err, err.stack, BarService.name);
        throw new BadRequestException(err.message);
      });
  }
}
