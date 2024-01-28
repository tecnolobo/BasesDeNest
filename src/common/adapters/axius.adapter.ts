import { HttpAdapter } from '../interfaces/http-adapte-interf';
import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable() //Para que sea inyectado en cualquier contructor
export class AxiusAdapter implements HttpAdapter{  

  private  axios:AxiosInstance = axios;

  async get<T>(url:string):Promise<T>{

    try {
      const {data} = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      throw new Error('This is as error check logs');
    }

  }

}