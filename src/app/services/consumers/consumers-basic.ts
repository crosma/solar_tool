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
    volts: 115,
    watts: 52,
    wattsSurge: 650,
    dutyCycle: 0.1, //6 minutes an hour

    quantity: 1,
  },

  {
    name: 'Computer - Laptop',
    details: 'Meh.',

    currentAC: true,
    volts: 115,
    watts: 75,

    quantity: 1,

    requirePureSine: true,
  },

  {
    name: 'Computer - Gaming Desktop',
    details: 'Computers use significantly more power when under loads such as gaming, should probably account for this somehow.',

    currentAC: true,
    volts: 110,
    watts: 150,

    quantity: 0,

    requirePureSine: true,
  },

  {
    name: 'Air Conditioner - 5000btu',
    amazon_asin: 'B00ODSAQBI',
    details: 'Air conditioner power consumption varies greatly based on the outside temperature, desired inside temperature and how good your insulation is.',

    currentAC: true,
    amps: 4,
    ampsSurge: 9,
    volts: 115,

    quantity: 0,

    dutyCycleByHour: [
      0,
      0,
      0,
      0,
      0,
      0,
      0.01212,
      0.06061,
      0.14545,
      0.26667,
      0.38182,
      0.48485,
      0.5697,
      0.6,
      0.5697,
      0.50909,
      0.41212,
      0.30303,
      0.2,
      0.10909,
      0.02424,
      0,
      0,
      0,
    ],
  },
];


export const BasicConsumers = createConsumersFromDefinitions(BasicConsumersDefinitions);
