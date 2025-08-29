import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MainProductsService } from './main-products.service';

@Controller('main-products')
export class MainProductsController {
  constructor(private readonly mainProductsService: MainProductsService) {}

  @Get('/:store')
  findAll(@Param() datesOfSearch) {
    return this.mainProductsService.findAll(datesOfSearch);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mainProductsService.findOne(+id);
  }
}
