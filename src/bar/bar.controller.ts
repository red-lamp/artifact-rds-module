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
import { ResponseDTO } from 'src/common/dto/response.dto';

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

  @Get('/project')
  getProjects(): Promise<ProjectDTO> {
    return this.barService
      .getProjects()
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

  @Get('/project/:user_id')
  getProjectsWithUserId(
    @Param('user_id') user_id: number,
  ): Promise<ProjectDTO> {
    return this.barService
      .getProjectsWithUserId(user_id)
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

  @Get('/project/one/:project_id')
  getProjectsWithId(
    @Param('project_id') project_id: number,
  ): Promise<ResponseDTO> {
    return this.barService
      .getProjectWithId(project_id)
      .then((data) => {
        const responseDTO = new ResponseDTO();
        responseDTO['project'] = data;

        return responseDTO;
      })
      .catch((err) => {
        Logger.error(err, err.stack, BarService.name);
        throw new BadRequestException(err.message);
      });
  }
}
