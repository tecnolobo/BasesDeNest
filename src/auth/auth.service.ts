import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>
  ){
    
  }

  //para encriptar contraseña usamos el paquete  yarn add bcrypt
  async create(createUserDto: CreateUserDto) {
    // return 'This action adds a new auth';
    try {
      const  {password, ...userData} = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password:bcrypt.hashSync(password,10)//encriptamos la contraseña y 10 vueltas
      });

      await this.userRepository.save(user);


      delete user.password;//Eliminanos del json la password

      return user;

    } catch (error) {
      this.handleDBErrors(error);
    }
  }


  private handleDBErrors(error:any):never{ //never jamas regresara ningun valor
    if(error.code==='23505'){
      throw new BadRequestException(error.detail);
    }else{
      throw new InternalServerErrorException('Porfavor mirar los logs');
    }
  }

}
