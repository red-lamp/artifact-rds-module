import { Module } from '@nestjs/common';
import { UserRepository } from 'src/foo/repositories/user.repository';
import { RDSModule } from 'src/rds/rds.module';
import { BarController } from './bar.controller';
import { BarService } from './bar.service';
import { AdminRepository } from './repositories/admin.repository';

@Module({
  imports: [RDSModule],
  controllers: [BarController],
  providers: [BarService, AdminRepository, UserRepository],
  exports: [BarService],
})
export class BarModule {}
