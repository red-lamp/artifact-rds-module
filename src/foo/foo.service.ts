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
    console.log('Name of user index 0 is', this.extractFullname(users[0]));

    // const usersLastname = await this.userRepository.findAll({
    //   attributes: ['last_name'],
    // });

    return users;
  }

  /**
   * Search users
   */
  async searchUsers(searchUsersDTO: SearchUsersDTO): Promise<Array<Model>> {
    // Find all users with ids
    const searchUserQuery = this.buildSearchUsersWithIds(searchUsersDTO);
    this.userRepository.findAllWithCallback(
      searchUserQuery,
      this.transformUserResult,
    );

    const users = await this.userRepository.findAll(searchUserQuery);
    return users;
  }

  /**
   * Get rbp user with uid__c
   */
  async getRBPUser(uid__c: string): Promise<Array<Model>> {
    // Find rbp user
    return await this.userRepository.queryRBPUser({
      where: { uid__c: uid__c },
    });
  }
}
