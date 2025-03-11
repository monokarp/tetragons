import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ZoneRepository } from './zone.repo';
import { ZoneData } from '@tetragons/shared';

@Controller('zone')
export class ZoneController {
  constructor(private readonly repo: ZoneRepository) {}

  @Get()
  public all() {
    return this.repo.all();
  }

  @Put()
  public create(@Body() body: ZoneData) {
    return this.repo.create(body);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.repo.delete(id);
  }
}
