import { IsString,IsUUID,IsOptional } from "class-validator";

export class UpdateCardDto{

  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id:string;

  @IsOptional()
  @IsString()
  readonly brand:string;
  
  @IsString()
  @IsOptional()
  readonly model:string;

 

}