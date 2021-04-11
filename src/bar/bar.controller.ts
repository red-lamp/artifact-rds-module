import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Param,
} from '@nestjs/common';
import { AdminDTO } from './dto/admin.dto';
import { ProjectDTO } from './dto/project.dto';
import { BarService } from './bar.service';

@Controller()
export class BarController {
  constructor(private readonly barService: BarService) {}

  @Get('/admins')
  getAdmins(): Promise<AdminDTO> {
    return this.barService
      .getAdmins()
      .then((data) => {
        const adminDTO = new AdminDTO();
        adminDTO.admins = data;

        return adminDTO;
      })
      .catch((err) => {
        Logger.error(err, err.stack, BarService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Get('/project/:user_id')
  getProjects(@Param('user_id') user_id: number): Promise<ProjectDTO> {
    return this.barService
      .getProjects(user_id)
      .then((data) => {
        const projectDTO = new ProjectDTO();
        projectDTO.projects = data;

        return projectDTO;
      })
      .catch((err) => {
        Logger.error(err, err.stack, BarService.name);
        throw new BadRequestException(err.message);
      });
  }
}
