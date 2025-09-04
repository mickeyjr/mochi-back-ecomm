import { Module } from '@nestjs/common';
import { MainProductsModule } from './main-products/main-products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GetBannersModule } from './get-banners/get-banners.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_CONEXION!),
    MainProductsModule,
    GetBannersModule,


  ],
})
export class AppModule {}
