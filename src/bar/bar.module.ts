import { Module } from '@nestjs/common';
import { RDSModule } from 'src/rds/rds.module';
import { BarController } from './bar.controller';
import { BarService } from './bar.service';
import { AdminRepository } from './repositories/admin.repository';

@Module({
  imports: [RDSModule],
  controllers: [BarController],
  providers: [BarService, AdminRepository],
  exports: [BarService],
})
export class BarModule {}
