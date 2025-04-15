import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { IProductService } from './interfaces/product.service.interface';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class ProductService implements IProductService {
  createProduct(createProductDto: CreateProductDTO) {
    return {
      id: uuidv4(),
      name: 'name',
      description: 'description',
      price: 100,
      stock: 100,
    };
  }

  findAllProducts() {
    return [];
  }

  findProduct(id: string) {
    return {
      id: id,
      name: 'name',
      description: 'description',
      price: 100,
      stock: 100,
    };
  }

  updateProduct(id: string, updateProductDto: UpdateProductDTO) {
    return  {
      id: id,
      name: 'name',
      description: 'description',
      price: 100,
      stock: 100,
    };;
  }

  removeProduct(id: string) {
    return `This action removes a #${id} product`;
  }
}
