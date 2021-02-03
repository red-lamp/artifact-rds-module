import { Model } from 'sequelize';

export interface PortOBRepository {
  extractFullname(user: Model): string;
}
