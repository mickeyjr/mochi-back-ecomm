import { Module } from '@nestjs/common';
import { GetBannersService } from './get-banners.service';
import { GetBannersController } from './get-banners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BannersService, BannersServiceSchema } from './entities/banners-service.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: BannersService.name, schema: BannersServiceSchema }
  ])
  ],
  controllers: [GetBannersController],
  providers: [GetBannersService],
})
export class GetBannersModule { }
