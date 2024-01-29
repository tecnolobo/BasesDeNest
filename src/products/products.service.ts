import { Injectable, InternalServerErrorException, Logger, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService'); 

  constructor(
    @InjectRepository(Product)
    private readonly producRepository:Repository<Product>,
  ){

  }

  async create(createProductDto: CreateProductDto) {

    try {
      const producto = this.producRepository.create(createProductDto);

      await this.producRepository.save(producto);

      return producto;

    } catch (error) {
      this.handleDBException(error);    
    }

    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  handleDBException(error:any){

    if(error.code==='23505'){
      throw new BadRequestException(`${error.detail}`);
    }else{
      this.logger.error(error);//Se usa parea mostrar lso errores de una forma mas amigable
      throw new InternalServerErrorException(`Error insesperado validar los logs`)

    }
  }
}
