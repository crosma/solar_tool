import {ConsumerDefinitions, createConsumersFromDefinitions} from './consumer'

const BasicConsumersDefinitions: ConsumerDefinitions = [
  {
    name: 'LED Light - Small',
    amazon_asin: 'B00ODSAQBI',

    volts: 12,
    watts: 2,

    quantity: 6,
  },

  {
    name: 'Fridge - Frizzer',
    url: 'https://www.reddit.com/r/vandwellers/comments/4efrgd/creating_an_effective_and_ultraefficient/',

    currentAC: true,
    volts: 110,
    watts: 52,
    wattsSurge: 650,
    dutyCycle: 0.1, //6 minutes an hour

    quantity: 1,
  },

  {
    name: 'Computer - Laptop',
    details: 'Meh.',

    currentAC: true,
    volts: 110,
    watts: 75,

    quantity: 1,
  },

  {
    name: 'Computer - Gaming Desktop',
    details: 'Computers use significantly more power when under loads such as gaming, should probably account for this somehow.',

    currentAC: true,
    volts: 110,
    watts: 150,

    quantity: 0,
  },

  {
    name: 'Air Conditioner - 5000btu',
    amazon_asin: 'B00ODSAQBI',
    details: 'Air conditioner power consumption varies greatly based on the outside temperature, desired inside temperature and how good your insulation is.',

    currentAC: true,
    amps: 4,
    ampsSurge: 9,
    volts: 110,

    quantity: 0,

    dutyCycle: 0.33, //20 minutes an hour
    dutyCycleByHour: [
      /*00*/ 0,
      /*01*/ 0,
      /*02*/ 0,
      /*03*/ 0,
      /*04*/ 0,
      /*05*/ 0,
      /*06*/ 0,
      /*07*/ 0,
      /*08*/ 0.33,
      /*09*/ 0.33,
      /*10*/ 0.33,
      /*11*/ 0.33,
      /*12*/ 0.33,
      /*13*/ 0.33,
      /*14*/ 0.33,
      /*15*/ 0.33,
      /*16*/ 0.33,
      /*17*/ 0.33,
      /*18*/ 0.33,
      /*19*/ 0.33,
      /*20*/ 0,
      /*21*/ 0,
      /*22*/ 0,
      /*23*/ 0,
    ], //runs 9am to 9pm
  },
];


export const BasicConsumers = createConsumersFromDefinitions(BasicConsumersDefinitions);
