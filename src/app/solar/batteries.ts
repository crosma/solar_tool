export class Battery {
  constructor(public name: string, public minimumLevel: number, public warningLevel: number, public dangerLevel: number, details: string = '') { }
}

export declare type Batteries = Battery[];

export const BatteryTypes: Batteries = [
  new Battery('Absorbed Glass Mat (AGM)', 50, 40, 30),
  new Battery('Wet Cell (flooded)', 50, 40, 30, 'Flooded batteries require regular maintenance.'), //TODO: Research flooded battery levels
  new Battery('Gel Cell', 50, 40, 30, 'Gel Cell batteries require a specific type of charger.'), //TODO: Research flooded battery levels
  new Battery('Lithium', 50, 40, 30, 'Are you rich?'), //TODO: Research lithum batteries
];
