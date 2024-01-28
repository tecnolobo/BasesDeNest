import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { vairbleEntornoConDefectos } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        load:[vairbleEntornoConDefectos]
      }
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
    PokemonModule,
    MongooseModule.forRoot(
      process.env.MONGODB,
      {dbName:'PokemonDb'}
    ),
    CommonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
