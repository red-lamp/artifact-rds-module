import { Module } from '@nestjs/common';
import { UserRepository } from 'src/foo/repositories/user.repository';
import { RDSModule } from 'src/rds/rds.module';
import { BarController } from './bar.controller';
import { BarService } from './bar.service';
import { AdminRepository } from './repositories/admin.repository';
import { ProjectRepository } from './repositories/project.repository';

@Module({
  imports: [RDSModule],
  controllers: [BarController],
  providers: [BarService, AdminRepository, UserRepository, ProjectRepository],
  exports: [BarService, ProjectRepository],
})
export class BarModule {}
