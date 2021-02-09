import { Model, Op } from 'sequelize';
import { SearchUsersDTO } from '../dto/search.users.dto';
import { PortOBRepository } from '../ports/port.ob.repository';

export class FooServiceAdapter implements PortOBRepository {
  extractFullname(user: Model): string {
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
