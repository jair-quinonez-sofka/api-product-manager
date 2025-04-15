import { CreateProductDTO,  } from "../dto/create-product.dto";
import { ProductDTO } from "../dto/product.dto";
import { UpdateProductDTO } from "../dto/update-product.dto";

export interface IProductService {
  createProduct(createProductDto: CreateProductDTO): ProductDTO;
  findAllProducts(): ProductDTO[];
  findProduct(id: string): ProductDTO;
  updateProduct(id: string, updateProductDto: UpdateProductDTO): ProductDTO;
  removeProduct(id: string): string;
}