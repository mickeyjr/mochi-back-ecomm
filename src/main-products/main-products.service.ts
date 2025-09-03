import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';

export interface SerieDoc {
  _id: Types.ObjectId;
  Serie: string;
  num?: number;
  __v?: number;
}

export interface BrandDoc {
  _id: Types.ObjectId;
  Brand: string;
}

export interface ProductoDoc {
  _id: Types.ObjectId;
  Serie?: Types.ObjectId | null;
  Brand?: Types.ObjectId | null;
}

export interface ImageDoc {
  _id: Types.ObjectId;
  ImagenBuffer: Buffer;
  ImagenMimeType: string;
}

export interface ProductByStoreDoc {
  _id: Types.ObjectId;
  Descripcion: string;
  Nombre: string;
  CodigoBarras: string;
  IdStore: string | Types.ObjectId;
  IdProduct: ProductoDoc;
  imagenes?: ImageDoc[];
}

export interface ProductoConSerieBrand extends Omit<ProductByStoreDoc, "IdProduct"> {
  Serie: Types.ObjectId | string | 0;
  Brand: Types.ObjectId | string | 0;
  IdProduct: Types.ObjectId;
}

@Injectable()
export class MainProductsService {
  constructor(
    @InjectModel('ProductByStore') private ProductByStoreModel: Model<ProductByStoreDoc>,
    @InjectModel('ImageProduct') private ImageProductModel: Model<ImageDoc>,
    @InjectModel('ProductosStock') private ProductosStockModel: Model<any>,
    @InjectModel('Series') private SeriesModel: Model<SerieDoc>,
    @InjectModel('Brand') private BrandModel: Model<BrandDoc>,
    @InjectModel('Productos') private ProductosModel: Model<ProductoDoc>,
  ) {}

  async findAll(store: { store: string }) {
    try {
      const productos = await this.ProductByStoreModel
        .find(
          { IdStore: store.store, InStock: true },
          { Descripcion: 1, Nombre: 1, CodigoBarras: 1, IdStore: 1, IdProduct: 1 },
        )
        .populate({ path: 'imagenes', select: 'ImagenBuffer ImagenMimeType' })
        .populate({ path: 'IdProduct', model: 'Productos', select: 'Serie Brand' })
        .lean<ProductByStoreDoc[]>()
        .exec();

      const productosConSerieBrand: ProductoConSerieBrand[] = productos.map(p => ({
        ...p,
        Serie: p.IdProduct?.Serie ?? 0,
        Brand: p.IdProduct?.Brand ?? 0,
        IdProduct: p.IdProduct?._id ?? (p.IdProduct as any),
      }));

      const series = await this.SeriesModel.find().lean<SerieDoc[]>().exec();

      const seriesMap = new Map(
        series.map(s => [String(s.num), s.Serie]), 
      );

      const agrupados = productosConSerieBrand.reduce((acc, prod) => {
        const serieId = prod.Serie ? String(prod.Serie) : "0";
        const serieNombre = seriesMap.get(serieId) || "Sin serie";

        if (!acc[serieNombre]) {
          acc[serieNombre] = [];
        }
        acc[serieNombre].push(prod);

        return acc;
      }, {} as Record<string, ProductoConSerieBrand[]>);

      const resultado = Object.entries(agrupados).map(([serie, productos]) => ({
        Serie: serie,
        productos,
      }));

      return resultado;

    } catch (error: any) {
      throw new HttpException(
        {
          status: 500,
          error: 'Ocurrió algo en el sistema',
          message: error.message,
        },
        500,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} mainProduct`;
  }
}
