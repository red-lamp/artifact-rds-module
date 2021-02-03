import { Model } from 'sequelize';
import { PortOBRepository } from '../ports/port.ob.repository';

export class FooServiceAdapter implements PortOBRepository {
  extractFullname(user: Model): string {
    return user.get('first_name') + ' ' + user.get('last_name');
  }
}
