import {Injectable} from '@angular/core';
import {
  Consumers,
  ConsumerGroups,
  createConsumersFromDefinitions,
  DefinitionsBasic,
  DefinitionsLights,
  DefinitionsKitchen,
  DefinitionsEntertainment,
  DefinitionsEnvironment
} from './consumers';

@Injectable()
export class ConsumersService {

  constructor() {
  }

  private cacheGroups: ConsumerGroups;
  private cacheFlat: Consumers = [];

  private cache() {
    if (!this.cacheGroups) {
      this.cacheGroups = [
        {
          name: 'Lighting',
          consumers: createConsumersFromDefinitions(DefinitionsLights),
        },
        {
          name: 'Kitchen',
          consumers: createConsumersFromDefinitions(DefinitionsKitchen),
        },
        {
          name: 'Entertainment',
          consumers: createConsumersFromDefinitions(DefinitionsEntertainment),
        },
        {
          name: 'Environment',
          consumers: createConsumersFromDefinitions(DefinitionsEnvironment),
        },
        {
          name: 'Other',
          consumers: createConsumersFromDefinitions(DefinitionsBasic),
        },
      ];

      for (var i = 0; i < this.cacheGroups.length; i++) {
        console.log('con', this.cacheGroups[i].consumers);
        this.cacheFlat = this.cacheFlat.concat(this.cacheGroups[i].consumers);
      }
    }

    console.log(this);
  }

  getConsumerGroups(): ConsumerGroups {
    this.cache();

    return this.cacheGroups;
  }

  getConsumers(): Consumers {
    this.cache();

    return this.cacheFlat;
  }
}
