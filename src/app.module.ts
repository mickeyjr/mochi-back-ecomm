import { Module } from '@nestjs/common';
import { MainProductsModule } from './main-products/main-products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_CONEXION!),
    MainProductsModule,


  ],
})
export class AppModule {}
