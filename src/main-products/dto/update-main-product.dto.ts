import { PartialType } from '@nestjs/mapped-types';
import { CreateMainProductDto } from './create-main-product.dto';

export class UpdateMainProductDto extends PartialType(CreateMainProductDto) {}
