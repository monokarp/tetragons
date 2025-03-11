import { Module } from '@nestjs/common';
import { ZoneController } from './zone.controller';
import { ZoneRepository } from './zone.repo';

@Module({
  imports: [],
  controllers: [ZoneController],
  providers: [ZoneRepository],
})
export class AppModule {}
