import { Car } from "src/cars/interfaces/car.interface";
import {v4 as uuiid} from "uuid";

export const CARSSEED:Car[] =[
  {
    id: uuiid(),
    brand:"toyota",
    model:"2024"
  },
  {
    id: uuiid(),
    brand:"Honda",
    model:"2019"
  },
  {
    id: uuiid(),
    brand:"Geep",
    model:"2020"
  },
  {
    id: uuiid(),
    brand:"suzukisedd",
    model:"2020"
  }
];