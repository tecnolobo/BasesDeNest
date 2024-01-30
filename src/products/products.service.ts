import { Injectable, InternalServerErrorException, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';
import {validate as IsUuid} from 'uuid';

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

  findAll({limit=10,offset=0}:PaginationDto) {
    return this.producRepository.find({
      take:limit,
      skip:offset
    });
  }

  async findOne(term: string) {

    let producto:Product;

    if(IsUuid(term)){
      producto = await this.producRepository.findOneBy({id:term});
    }else{
      producto = await this.producRepository.findOneBy({slug:term});
    }

    if(!producto){
      throw new NotFoundException(`El producto ${term} no existe `); 
    }

    return producto;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    const produc = await this.producRepository.preload({ //Precarga primero el pdocuto buscandolo por id y las demas propiedades
      //Las a usar para actualizarlos.
      id:id,
      ... updateProductDto
    });

    if (!produc){
      throw new NotFoundException(`No se encontro el producto ${id}`);
    }

    return this.producRepository.save(produc); //Se guarda y se retorna
  }

  async remove(id: string) {

    const product= await this.findOne(id);

    await this.producRepository.remove(product);

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
