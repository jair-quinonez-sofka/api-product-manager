import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { IProductService } from './interfaces/product.service.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PaginationDTO } from '../common/dto/pagination.dto';


@Injectable()
export class ProductService implements IProductService {

  private readonly logger = new Logger('ProductService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {

  }

  async createProduct(createProductDto: CreateProductDTO) {
    try {
      const newProduct = this.productRepository.create(createProductDto);

      await this.productRepository.save(newProduct);

      console.log(typeof newProduct.price)
      return {
        id: newProduct.id,
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        stock: newProduct.stock,
      }

    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  async findAllProducts(pagination: PaginationDTO) {
    const { limit = 25, offset = 0 } = pagination;
    try {
      const productsFound = await this.productRepository.find({
        take: limit,
        skip: offset,
      });
      return {
        size: productsFound.length,
        products: productsFound.map(product => {
          return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
          };
        })
      }

    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findProduct(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async updateProduct(updateProductDto: UpdateProductDTO) {
    const { id } = updateProductDto;
    const product = await this.productRepository.preload({
      id,
      name: updateProductDto.name,
      description: updateProductDto.description,
      price: updateProductDto.price,
      stock: updateProductDto.stock,
    });

    if (!product) throw new NotFoundException('Product not found');

    try {
      await this.productRepository.save(product);
      return product;

    } catch (error) {
      this.handleDBErrors(error);

    }

  }

  async removeProduct(id: string) {

    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepository.remove(product);

    return `This action removes a ${product.name} product`;
  }

  private handleDBErrors(error: any) {
    this.logger.error(error.message, error.code);

    if (error.code === '23505') {
      throw new BadRequestException('Duplicated product name', error.detail);
    }
    throw new InternalServerErrorException('Unexpected error creating product');
  }
}
