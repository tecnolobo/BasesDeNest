import { Injectable } from '@nestjs/common';
import { BRANDS_SEED } from './data/brand.seed';
import { CARSSEED } from './data/cars.seed';
import { CarsService } from '../cars/cars.service';
import { BrandsService } from '../brands/brands.service';

@Injectable()
export class SeedService {
  
  
  constructor(
    private readonly carsService:CarsService,
    private readonly brandsService:BrandsService
  ){

  }

  populeteDB(){

    //CARSSEED,
    //BRANDS_SEED

    this.carsService.fillCarsWithSeedDate(CARSSEED);
    this.brandsService.fillBrandWithSeedDate(BRANDS_SEED);

    return {
      
    };
  }
}
