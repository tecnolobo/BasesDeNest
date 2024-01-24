import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import {v4 as uuid} from 'uuid';
import { CreateCardDto,UpdateCardDto } from './dto';

@Injectable()
export class CarsService {

  private cars:Car[]=[
    /*{
      id:uuid(),
      brand:'bran',
      model:'Corolla'
    },
    {
      id:uuid(),
      brand:'Honda',
      model:'Sid'
    },
    {
      id:uuid(),
      brand:'Jeep',
      model:'Otra'
    }*/
  ];

  findAll(){
    return this.cars;
  }

  findById(id:string){    
    const cart = this.cars.find(car=>car.id===id);
    if(!cart) throw new NotFoundException(`el carro con el id=${id} no existe`); //Estos puede enviar el mensaje personalizado si asi se dese por parametro
   
    return cart;
  }

  create(createCardDto:CreateCardDto){
    let newcar:Car = {
      id:uuid(),
      ...createCardDto
    };
    this.cars.push(newcar);
    return  newcar;
  }

  update(id:string,updateCardDto:UpdateCardDto){
    let cardb = this.findById(id);
    
    this.cars= this.cars.map(car=>{
      
      if(car.id===id){
        //Aqui lo que hace es en la variable cardb se le addicionan las propiedades de ...cardb y se sobre escriben si estan en ..updateCardDto y se sobre escribe el id en caso que no venga
        cardb = {
          ...cardb,
          ...updateCardDto,
          id
        }
        return cardb;
      }else{
        return cardb;
      }
    });

    return cardb;

  }


  delete(id:string){
    console.log('Aqui voy bien');
    let cardb = this.findById(id);
    this.cars = this.cars.filter((car) => car.id !== id); 
    return {mensaje:`Carro con el id ${id} y nombre ${cardb.brand} Eliminado`};
  }


  fillCarsWithSeedDate(cars:Car[]){
    this.cars = cars;
  }

}
