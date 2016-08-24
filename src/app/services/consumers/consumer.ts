
//http://www.rapidtables.com/calc/electric/watt-volt-amp-calculator.htm

export declare type ConsumerDefinitions = ConsumerDefinition[];

export interface ConsumerDefinition {
  name: string;
  details?: string;
  url?: string;
  amazon_asin?: string;

  currentAC?: boolean; //if false, is dc
  volts?: number;
  watts?: number;
  wattsSurge?: number;
  amps?: number;
  ampsSurge?: number;
  dutyCycle?: number; //percent in decimal 0-1
  requirePureSine?: boolean;
  hours?: number[]; //array 0-23, boolean

  quantity?: number;
}


export class Consumer {
  public name: string;

  public details: string = '';
  public url: string = '';
  public amazon_asin: string = '';

  public  currentAC: boolean = false; //true for AC false for DC
  public  volts: number = 0;
  public  watts: number = 0;
  public  wattsSurge: number = 0;
  public  amps: number = 0;
  public  ampsSurge: number = 0;
  public  dutyCycle: number = 1; //percent in decimal 0-1
  public  requirePureSine: boolean = false;
  public  hours: number[] = []; //array 0-23, boolean

  public quantity: number = 0;

  constructor(def: ConsumerDefinition) {
    for(var prop in def) {
      if (!def.hasOwnProperty(prop)) continue;

      this[prop] = def[prop];
    }

    if (def.watts && def.volts) { //The current I in amps (A) is equal to the power P in watts (W) divided by the voltage V in volts (V)
      this.amps = this.watts / this.volts;
      this.ampsSurge = this.wattsSurge / this.volts;

    } else if (def.amps && def.volts) { //The power P in watts (W) is equal to the voltage V in volts (V) times the current I in amps (A):
      this.watts = this.volts * this.amps;
      this.wattsSurge = this.volts * this.ampsSurge;

    } else {
      throw new Error("Not enough userData to figure power consumption.");
    }
  }

  getHoursPerDay(): number {
    return this.hours.length > 0 ? this.hours.length : 24;
  }

  getHour(hour): boolean {
    return this.hours.length <= 0 || this.hours.indexOf(hour) >= 0;
  }
}

export declare type Consumers = Consumer[];

export function createConsumersFromDefinitions(defs: ConsumerDefinitions): Consumers {
  let list: Consumers = [];

  for (let def of defs) {
    list.push(new Consumer(def));
  }

  return list;
}
