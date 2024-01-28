import { Injectable } from '@nestjs/common';
//import axios, { AxiosInstance } from 'axios';
import { PokemonResponse } from './interfaces/poke-interface.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { AxiusAdapter } from '../common/adapters/axius.adapter';


@Injectable()
export class SeedService {
  
  constructor(
    @InjectModel(Pokemon.name)
    private readonly PokemonModel:Model<Pokemon>,
    private readonly httpAdapter:AxiusAdapter //Aqui se implementa la clase para no usar directamente Axius
  ){

  }

  //private readonly axios:AxiosInstance = axios; //Se quita esto para usar la clase adaptadora.

  async executeSeed(){
    //const {data} = await this.axios.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=100');

    //Aqui ya se usa mi httpAdapter y se usa en vez de axius
    const data = await this.httpAdapter.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=100');

    //console.log(data);
    await this.PokemonModel.deleteMany();
    
    let pokemonInsert:{name:string,no:number}[]=[];
    data.results.forEach(async({name,url}) => {
      
      const segm = url.split('/');
      const no:number = +segm[segm.length-2];
      const newPokemon = {name,no};
      pokemonInsert.push(newPokemon);
         
    }); 
    
    await this.PokemonModel.insertMany(pokemonInsert);

    return 'Todo ok';
  }
}
