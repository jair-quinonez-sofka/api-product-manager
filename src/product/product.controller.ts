import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { IDProductDTO } from './dto/id-product.dto';

@Controller('api/v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post('/create')
  create(@Body() createProductDto: CreateProductDTO) {
    return this.productService.createProduct(createProductDto);
  }

  @Get('/getAll')
  findAll() {
    return this.productService.findAllProducts();
  }

  @Get('/getById/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findProduct(id);
  }

  @Post('/update')
  update(
    @Body() updateProductDto: UpdateProductDTO
  ) {
    return this.productService.updateProduct(updateProductDto.id, updateProductDto);
  }

  @Post('/remove')
  remove(
    @Body() deleteProductDto: IDProductDTO
  ) {
    return this.productService.removeProduct(deleteProductDto.id);
  }
}
