import { Model } from 'sequelize';
import { SearchUsersDTO } from '../dto/search.users.dto';

export interface PortOBRepository {
  transformUserResult(user: Model[]): void;
  extractFullname(user: Model): string;
  buildSearchUsersWithIds(searchUsersDTO: SearchUsersDTO): any;
}
