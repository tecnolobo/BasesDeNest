import { Module } from '@nestjs/common';
import { AxiusAdapter } from './adapters/axius.adapter';

@Module({

  providers:[
    AxiusAdapter
  ],
  exports:[
    AxiusAdapter
  ]

})
export class CommonModule {}
