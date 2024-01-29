import { Injectable, InternalServerErrorException, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
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
    return this.producRepository.find();
  }

  async findOne(id: string) {

    const produc = await this.producRepository.findOneBy({id:id});
    if(!produc){
      throw new NotFoundException(`El producto ${id} no existe `); 
    }

    return produc;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
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
