import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users') //Aqui se pone nombre tabla
export class User {

  @PrimaryGeneratedColumn('uuid')
  id:string; //idnetificador unico por uusairo

  @Column('text',{
    unique:true
  })
  email:string;
   
  @Column('text',{
    select:false //De esta forma no traemos nunca la contaseña
  })
  password:string;

  @Column('text',{})
  fullName:string;

  @Column('bool',{
    default:true
  }) //boolean es para postgress
  isActive:boolean; 

  @Column('text',{
    array:true,
    default:['user']// rol por defefcto
  })
  roles:string[];


}


