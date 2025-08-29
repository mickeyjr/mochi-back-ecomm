import { Module } from '@nestjs/common';
import { MainProductsService } from './main-products.service';
import { MainProductsController } from './main-products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductByStoreSchema } from './entities/product-by-store.entity';
import { ImageProductSchema } from './entities/image-product.entity';
import { ProductStockSchema } from './entities/products-stock';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProductByStore', schema: ProductByStoreSchema },
      { name: 'ImageProduct', schema: ImageProductSchema },
      { name: 'ProductosStock', schema: ProductStockSchema }

    ])
  ],
  controllers: [MainProductsController],
  providers: [MainProductsService],
})
export class MainProductsModule { }
