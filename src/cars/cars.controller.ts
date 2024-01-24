import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCardDto } from './dto/create-car.dto';
import { UpdateCardDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {
 
  constructor(
    private readonly carsService:CarsService
  ){

  }

  @Get()
  getAllCars(){
    return this.carsService.findAll();
  }


  @Get(':id')
  getCarById(@Param('id',ParseUUIDPipe) id:string){
    return this.carsService.findById(id);
  }

  @Post()
  crarCarro(@Body() createCardDto:CreateCardDto){
    return this.carsService.create(createCardDto);
  }

  @Patch(':id')
  updateCard(
    @Param('id',ParseUUIDPipe) id:string,
    @Body() updateCardDto:UpdateCardDto
    ){
    
    return this.carsService.update(id,updateCardDto);
  }

  @Delete(':id')
  deleteCard(@Param('id',ParseUUIDPipe) id:string){
    return this.carsService.delete(id);
  }



}
