import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { BarService } from 'src/bar/bar.service';
import { FooControllerAdapter } from './adapters/foo.controller.adapter';
import { UsersAdminsDTO } from './dto/users-admin.dto';
import { SearchUsersDTO } from './dto/search.users.dto';
import { FooService } from './foo.service';
import { ResponseDTO } from 'src/common/dto/response.dto';

@Controller()
export class FooController extends FooControllerAdapter {
  constructor(
    private readonly fooService: FooService,
    private readonly barService: BarService,
  ) {
    super();
  }

  @Get('/users')
  getUsers(): Promise<UsersAdminsDTO> {
    return this.fooService
      .getUsers()
      .then((data) => {
        const usersAdminsDTO = new UsersAdminsDTO();
        usersAdminsDTO.users = data;

        return usersAdminsDTO;
      })
      .catch((err) => {
        Logger.error(err, err.stack, FooService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Post('users/search')
  searchUsers(@Body() searchUsersDTO: SearchUsersDTO): Promise<UsersAdminsDTO> {
    return this.fooService
      .searchUsers(searchUsersDTO)
      .then((data) => {
        const usersAdminsDTO = new UsersAdminsDTO();
        usersAdminsDTO.users = data;

        return usersAdminsDTO;
      })
      .catch((err) => {
        Logger.error(err, err.stack, FooService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Get('/users/:uid__c')
  getRBPUser(@Param('uid__c') uid__c: string): Promise<ResponseDTO> {
    return this.fooService
      .getRBPUser(uid__c)
      .then((data) => {
        const responseDTO = new ResponseDTO();
        responseDTO['rbp_user'] = data;

        return responseDTO;
      })
      .catch((err) => {
        Logger.error(err, err.stack, FooService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Get('/users_project')
  getUsersWithProject(): Promise<UsersAdminsDTO> {
    return this.fooService
      .getUsersWithProject()
      .then((data) => {
        const usersAdminsDTO = new UsersAdminsDTO();
        usersAdminsDTO.users = data;

        return usersAdminsDTO;
      })
      .catch((err) => {
        Logger.error(err, err.stack, FooService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Get('/usersWithAdmins')
  getUserWithAdmins(): Promise<UsersAdminsDTO> {
    const promiseUsers = this.fooService.getUsers();
    const promiseAdmins = this.barService.getAdmins();

    return Promise.all([promiseUsers, promiseAdmins])
      .then((values) => {
        const usersAdminsDTO = new UsersAdminsDTO();
        usersAdminsDTO.users = values[0];
        usersAdminsDTO.admins = values[1];
        usersAdminsDTO.totalItems = this.totalItems(
          values[0].length,
          values[1].length,
        );

        return usersAdminsDTO;
      })
      .catch((err) => {
        Logger.error(err, err.stack, FooService.name);
        throw new BadRequestException(err.message);
      });
  }
}
