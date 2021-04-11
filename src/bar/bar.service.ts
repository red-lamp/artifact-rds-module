import { Injectable } from '@nestjs/common';
import { Model } from 'sequelize';
import { AdminRepository } from './repositories/admin.repository';
import { BarServiceAdapter } from './adapters/bar.service.adapter';
import { ProjectRepository } from './repositories/project.repository';

@Injectable()
export class BarService extends BarServiceAdapter {
  constructor(
    private adminRepository: AdminRepository,
    private projectRepository: ProjectRepository,
  ) {
    super();
  }

  /**
   * Get all admins
   */
  async getAdmins(): Promise<Array<Model>> {
    // Find all admins
    return await this.adminRepository.findAll();
  }

  /**
   * Get all projects with user id
   */
  async getProjects(user_id: number): Promise<Array<Model>> {
    return await this.projectRepository.findAllAssociation('projectWithUser', {
      where: { user_id: user_id },
    });
  }
}
