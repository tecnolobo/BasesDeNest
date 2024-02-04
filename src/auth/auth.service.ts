import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>
  ){
    
  }

  async create(createUserDto: CreateUserDto) {
    // return 'This action adds a new auth';
    try {
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);

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
