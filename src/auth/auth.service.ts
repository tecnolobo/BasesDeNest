import { Injectable, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>
  ){
    
  }

  //para encriptar contraseña usamos el paquete  yarn add bcrypt
  async createUser(createUserDto: CreateUserDto) {
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


  //para encriptar contraseña usamos el paquete  yarn add bcrypt
  async  loginUser(loginUserDto:LoginUserDto) {
    
    const {password,email} = loginUserDto;

    const user = await this.userRepository.findOne({
      where:{email},
      select:{email:true,password:true} //Trae solo el email y el passwod esto salta la configuracion que le hizimos en la ENTIDAD que no trjera la password
    });

    if(!user){
      throw new UnauthorizedException('Validationes incorrectos');
    }

    if(bcrypt.compareSync(password,user.password) ){
      throw new UnauthorizedException('Validationes incorrectos pass');
    }
    
    return user;

  }


  private handleDBErrors(error:any):never{ //never jamas regresara ningun valor
    if(error.code==='23505'){
      throw new BadRequestException(error.detail);
    }else{
      throw new InternalServerErrorException('Porfavor mirar los logs');
    }
  }

}
