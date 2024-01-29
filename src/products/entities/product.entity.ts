import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {

  @PrimaryGeneratedColumn('uuid')//Usaremos que sea uuid de ORM
  id:string;

  @Column('text',{
    unique:true
  })
  title:string;

  @Column('float',{
    default:0
  })
  price:number;

  @Column({
    type:'text',
    nullable:true
  })
  description:string;


  @Column({
    type:'text', unique:true
  })
  slug:string;

  @Column('int',{
    default:0
  })
  stock:number;

  @Column({
    type:'text',
    array:true
  })
  sizes:string[];

  @Column({
    type:'text'
  })
  gender:string;

}
