import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GetBannersService } from './get-banners.service';
import { CreateGetBannerDto } from './dto/create-get-banner.dto';
import { UpdateGetBannerDto } from './dto/update-get-banner.dto';

@Controller('get-banners')
export class GetBannersController {
  constructor(private readonly getBannersService: GetBannersService) {}

  @Post()
  create(@Body() createGetBannerDto: CreateGetBannerDto) {
    return this.getBannersService.create(createGetBannerDto);
  }

  @Get()
  findAll() {
    return this.getBannersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getBannersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGetBannerDto: UpdateGetBannerDto) {
    return this.getBannersService.update(+id, updateGetBannerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.getBannersService.remove(+id);
  }
}
