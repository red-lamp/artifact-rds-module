import { Model } from 'sequelize';
import { SearchUsersDTO } from '../dto/search.users.dto';

export interface PortOBRepository {
  extractFullname(user: Model): string;
  buildSearchUsersWithIds(searchUsersDTO: SearchUsersDTO): any;
}
