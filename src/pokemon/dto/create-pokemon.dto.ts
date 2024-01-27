import { IsInt, IsPositive, Min, Length, IsString, MinLength } from 'class-validator';

export class CreatePokemonDto {

  //is int , is posivite,min 1
  @IsInt()
  @IsPositive()
  @Min(1)
  no:number;

  //isString, minlenth 1
  @IsString()
  @MinLength(1)
  name:string;

}

