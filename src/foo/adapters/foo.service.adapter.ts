import { Model, Op } from 'sequelize';
import { SearchUsersDTO } from '../dto/search.users.dto';
import { PortOBRepository } from '../ports/port.ob.repository';

export class FooServiceAdapter implements PortOBRepository {
  transformUserResult = (users: Model[]) => {
    console.log('listener', this.extractFullname(users[0]));
  };

  extractFullname(user: Model): string {
    console.log('listener', this);
    return user.get('first_name') + ' ' + user.get('last_name');
  }

  buildSearchUsersWithIds(searchUsersDTO: SearchUsersDTO): any {
    const userIds = [];
    searchUsersDTO.usersId.forEach((id) => {
      userIds.push({ id: id });
    });
    return {
      where: {
        [Op.or]: userIds,
      },
    };
  }
}
