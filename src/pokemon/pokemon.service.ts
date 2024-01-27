import { Injectable, Body, Post, Controller, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { json } from 'stream/consumers';
import { allowedNodeEnvironmentFlags } from 'process';


@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly PokemonModel:Model<Pokemon>){

  }

  async create( createPokemonDto: CreatePokemonDto) {
    
    try {
      createPokemonDto.name = createPokemonDto.name.toLowerCase();
      const pokemonNuevo =  await this.PokemonModel.create(createPokemonDto);      
      
      return pokemonNuevo;

    } catch (error) {
      //console.log(error);
      this.handelException(error);
    }
    

  }

  async findAll() {
    return await this.PokemonModel.find();
  }

  async findOne(term: string) {
    let pokemon:Pokemon;
    if (!isNaN(+term)){
      pokemon = await this.PokemonModel.findOne(
        {no:term}
      );
    }

    ///Mongo id
    if(!pokemon && isValidObjectId(term)){
      pokemon = await this.PokemonModel.findById(term);
    }

    //name
    if(!pokemon) {
      pokemon = await this.PokemonModel.findOne(
        {name:term}
      );
    }

    if(!pokemon) 
    throw new NotFoundException(`El pokemon ${term} No existe`)

    return pokemon ;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term);

    if(updatePokemonDto.name){
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    }
    
    try {
      await pokemon.updateOne(updatePokemonDto) ;  

      return {
        ... pokemon.toJSON(),...updatePokemonDto
      }

    } catch (error) {
      // console.log(error);
      this.handelException(error);

    }
      

    ;
  }

  async remove(id: string) {
    //const pokemon = await this.findOne(id);
    //await pokemon.deleteOne();
    //const rest = await this.PokemonModel.findByIdAndDelete(id);

    const rest = await this.PokemonModel.deleteOne({_id:id});

    if(rest.deletedCount==0){
      throw new BadRequestException('No existe nada para eliminar');
    }
  
  }


  private handelException(error:any){

    if(error.code=11000) {//
      throw new BadRequestException(`Pokemon con ${JSON.stringify(error.keyValue)} Ya existe`);
    }
    throw new InternalServerErrorException(`No se puede crear el pokemon, Valida los logs`);

  }
}
