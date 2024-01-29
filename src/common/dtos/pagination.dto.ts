import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';
export class PaginationDto{

  @IsOptional()
  @IsPositive()
  @Type(()=>Number) //Trasformaos el dato que viene a un numero
  limit?:number;

  @IsOptional()
  @Type(()=>Number) //Trasformaos el dato que viene a un numero
  offset?:number;

}