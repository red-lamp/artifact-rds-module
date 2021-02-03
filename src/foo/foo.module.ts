import { Module } from '@nestjs/common';
import { BarModule } from 'src/bar/bar.module';
import { RDSModule } from 'src/rds/rds.module';
import { FooController } from './foo.controller';
import { FooService } from './foo.service';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [RDSModule, BarModule],
  controllers: [FooController],
  providers: [FooService, UserRepository],
})
export class FooModule {}
