import { Injectable } from '@nestjs/common';
import { Model } from 'sequelize';
import { UserRepository } from './repositories/user.repository';
import { FooServiceAdapter } from './adapters/foo.service.adapter';
import { SearchUsersDTO } from './dto/search.users.dto';

@Injectable()
export class FooService extends FooServiceAdapter {
  constructor(private userRepository: UserRepository) {
    super();
  }

  /**
   * Get all users
   */
  async getUsers(): Promise<Array<Model>> {
    // Find all users
    const users = await this.userRepository.findAll();
    // console.log('All users:', users);

    // const usersLastname = await this.userRepository.findAll({
    //   attributes: ['last_name'],
    // });
    // console.log('Name of user index 0 is', this.extractFullname(users[0]));

    return users;
  }

  /**
   * Search users
   */
  async searchUsers(searchUsersDTO: SearchUsersDTO): Promise<Array<Model>> {
    // Find all users with ids
    const users = await this.userRepository.findAll(
      this.buildSearchUsersWithIds(searchUsersDTO),
    );
    return users;
  }
}
