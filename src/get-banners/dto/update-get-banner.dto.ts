import { PartialType } from '@nestjs/mapped-types';
import { CreateGetBannerDto } from './create-get-banner.dto';

export class UpdateGetBannerDto extends PartialType(CreateGetBannerDto) {}
