import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { IDProductDTO } from './dto/id-product.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

@Controller('api/v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post('/create')
  create(@Body() createProductDto: CreateProductDTO) {
    return this.productService.createProduct(createProductDto);
  }

  @Get('/getAll')
  findAll(@Query() paginationDto: PaginationDTO) {
    return this.productService.findAllProducts(paginationDto);
  }

  @Get('/getById/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.findProduct(id);
  }

  @Post('/update')
  update(
    @Body() updateProductDto: UpdateProductDTO
  ) {
    return this.productService.updateProduct(updateProductDto);
  }

  @Post('/remove')
  remove(
    @Body() deleteProductDto: IDProductDTO
  ) {
    return this.productService.removeProduct(deleteProductDto.id);
  }
}
