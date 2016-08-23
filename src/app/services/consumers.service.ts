import { Injectable } from '@angular/core';
import { Consumer } from './consumers/consumer';
import { BasicConsumers } from './consumers/consumers-basic';

@Injectable()
export class ConsumersService {

  constructor() { }

  getConsumers(): Consumer[] {
    return BasicConsumers;
  }
}
