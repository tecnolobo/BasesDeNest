import { Car } from "src/cars/interfaces/car.interface";
import {v4 as uuiid} from "uuid";
import { Brand } from '../../brands/entities/brand.entity';

export const BRANDS_SEED:Brand[] =[
  {
    id:uuiid(),
    name:"Vovlo",
    createAd:new Date().getTime()
  },
  {
    id:uuiid(),
    name:"Tyoya",
    createAd:new Date().getTime()
  },
  {
    id:uuiid(),
    name:"Honda",
    createAd:new Date().getTime()
  },
  {
    id:uuiid(),
    name:"Teslaseed",
    createAd:new Date().getTime()
  },
];