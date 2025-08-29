import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class MainProductsService {

  constructor(
    @InjectModel('ProductByStore') private ProductByStoreModel: Model<any>,
    @InjectModel('ImageProduct') private ImageProductModel: Model<any>,
    @InjectModel('ProductosStock') private ProductosStockModel: Model<any>

  ) { }

  async findAll(store: any) {
    try {
      const productos = await this.ProductByStoreModel
        .find({ IdStore: store.store },
          { Descripcion: 1, Nombre: 1, CodigoBarras: 1, IdStore: 1, IdProduct: 1 }
        )
        .populate({ path: 'imagenes', select: 'ImagenBuffer ImagenMimeType' })
        .exec();

      const productosConStock = await Promise.all(
        productos.map(async (p) => {
          const productId = new mongoose.Types.ObjectId(p.IdProduct);
          const stockDoc = await this.ProductosStockModel.findOne({
            IdProduct: productId,
            IdStore: store.store
          })
            .select('Stock IdStore');
          const stock = stockDoc?.toObject();
          return {
            ...p.toObject(),
            productStock: stock || null
          };
        })
      );

      const filtrados = productosConStock.filter(
        p => !p.productStock || (p.productStock && p.productStock.Stock > 0)
      );

      return filtrados;

    } catch (error) {
      throw new HttpException({
        status: 500,
        error: 'Ocurrió algo en el sistema',
        message: error.message,
      }, 500);
    }
  }


  findOne(id: number) {
    return `This action returns a #${id} mainProduct`;
  }

}
