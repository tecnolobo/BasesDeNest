import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2');
  //Se hace uso de los pipes que se van usar en cualquier request
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Esto indica que va eliminar las propiedades que no lucen como las clases a las que deben ser semejantes
      forbidNonWhitelisted: true, //Esto le dice las propiedades dentro del request tiene que venir exactamente iguales que las calses DTO
      transform:true,
      transformOptions:{
        enableImplicitConversion:true
      }
    })
  );
  await app.listen(3000);
}
bootstrap();
