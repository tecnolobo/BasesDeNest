import { 
  IsEmail
  , IsString
  , Matches
  , MaxLength
  , MinLength 
} from 'class-validator';


export class LoginUserDto {

  @IsString()
  @IsEmail()
  email:string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches( //exprecion regular para valida si contraseña segura
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password:string;


}
