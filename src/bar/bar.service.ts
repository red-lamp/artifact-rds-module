import { Injectable } from '@nestjs/common';
import { Model } from 'sequelize';
import { AdminRepository } from './repositories/admin.repository';
import { BarServiceAdapter } from './adapters/bar.service.adapter';

@Injectable()
export class BarService extends BarServiceAdapter {
  constructor(private adminRepository: AdminRepository) {
    super();
  }

  /**
   * Get all admins
   */
  async getAdmins(): Promise<Array<Model>> {
    // Find all admins
    const admins = await this.adminRepository.findAll();
    return admins;
  }
}
