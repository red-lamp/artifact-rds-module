import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BarModule } from './bar/bar.module';
import configuration from './config/configuration';
import { FooModule } from './foo/foo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    FooModule,
    BarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
