import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import {v4 as uuid} from 'uuid';

@Injectable()
export class BrandsService {

  private brands:Brand[]=[
    /*{
      id:uuid(),
      name:"toyota2",
      createAd:new Date().getTime()
    }*/
  ];

  create(createBrandDto: CreateBrandDto) {
    const brand:Brand= {
      id:uuid(),
      name:createBrandDto.name.toLocaleLowerCase(),
      createAd: new Date().getTime()

    }

    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const bran= this.brands.find(brand=>brand.id===id);
    if(!bran){
      throw new NotFoundException(`Brand con el id ${id} no se existe`);      
    }

    return bran;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {

    let brandBD = this.findOne(id);

    this.brands = this.brands.map(brand=>{
      if(brand.id===id){
        brandBD.updateAd= new Date().getTime();
        brandBD ={
          ...brandBD,
          ...updateBrandDto
        }
        return brandBD;
      }
      return brand;
    });
    
  }

  remove(id: string) {
    console.log('id del gran '+id);
    return this.brands = this.brands.filter(bran=>bran.id !== id);
  }

  fillBrandWithSeedDate(brand:Brand[]){
    this.brands = brand;
  }
}
