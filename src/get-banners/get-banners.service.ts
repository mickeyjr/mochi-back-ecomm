import { Injectable } from '@nestjs/common';
import { CreateGetBannerDto } from './dto/create-get-banner.dto';
import { UpdateGetBannerDto } from './dto/update-get-banner.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BannersService } from './entities/banners-service.entity';
import { Model } from 'mongoose';

@Injectable()
export class GetBannersService {

  constructor(
    @InjectModel(BannersService.name) private BannersServiceSchema: Model<BannersService>
  ) { }

  create(createGetBannerDto: CreateGetBannerDto) {
    return 'This action adds a new getBanner';
  }

  async findAll() {
    const allBanners = await this.BannersServiceSchema.find().exec();
    const sorted = allBanners.sort((a, b) => a.position - b.position);
    return sorted;
  }

  findOne(id: number) {
    return `This action returns a #${id} getBanner`;
  }

  update(id: number, updateGetBannerDto: UpdateGetBannerDto) {
    return `This action updates a #${id} getBanner`;
  }

  remove(id: number) {
    return `This action removes a #${id} getBanner`;
  }
}
