import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    if(!isValidObjectId(value)){
      throw new BadRequestException(`el ${value} is not mongoId valid`);
    }

    return value;
  }
}
