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
    amazon_asin: 'B011KFQASE',
    details: 'Based this one on Amazon\'s recommended "Home" laptop. The power adapter provides up to 65 watts but under normal use the laptop would use far less. I configured it for 35 watts, 8 Hours per day.',

    currentAC: true,
    volts: 115,
    watts: 35,
    requirePureSine: true,

    quantity: 1,

    dutyCycleByHour: [
      0, //midnight to 1am
      0,
      0,
      0,
      0,
      0,
      0, //6 am
      0,
      0,
      0,
      0,
      1,
      1, //noon to 1pm
      1,
      1,
      1,
      1,
      1,
      1, //6 pm
      0,
      0,
      0,
      0,
      0, //11pm to midnight
    ],
  },

  {
    name: 'Computer - Gaming Desktop',
    details: 'Computers use significantly more power when under loads such as gaming, should probably account for this somehow. 8 Hours per day.',

    currentAC: true,
    volts: 115,
    watts: 100,
    requirePureSine: true,

    quantity: 0,

    dutyCycleByHour: [
      0, //midnight to 1am
      0,
      0,
      0,
      0,
      0,
      0, //6 am
      0,
      0,
      0,
      0,
      1,
      1, //noon to 1pm
      1,
      1,
      1,
      1,
      1,
      1, //6 pm
      0,
      0,
      0,
      0,
      0, //11pm to midnight
    ],
  },

  {
    name: 'Air Conditioner - 5000btu',
    amazon_asin: 'B01B4XUUDI',
    details: 'Air conditioner power consumption varies greatly based on the outside temperature, desired inside temperature and how good your insulation is. These numbers are based on a pretty hot day.',

    currentAC: true,
    watts: 450,
    wattsSurge: 1000,
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

  {
    name: 'Slow Cooker - 4 Quart',
    amazon_asin: 'B004O07LRC',
    details: `This one will be hard to be accurate as it's power consumption will vary greatly based on how use it. High=200-225W, Medium=185-200W, Low=165W.`,

    currentAC: true,
    watts: 185,
    volts: 120,

    quantity: 0,

    dutyCycleByHour: [
      0, //midnight to 1am
      0,
      0,
      0,
      0,
      0,
      0, //6 am
      0,
      0,
      0,
      0,
      0,
      1, //noon to 1pm
      1,
      1,
      1,
      1,
      1,
      1, //6 pm
      0,
      0,
      0,
      0,
      0, //11pm to midnight
    ],
  },

  {
    name: 'TV - 24" 12V DC',
    amazon_asin: 'B0082ULKUE',
    details: `Wattage based on the Energy Star info. This thing is power hungry compared to some newer 110V TVs.`,

    currentAC: false,
    watts: 93 / 365 / 5 * 1000,
    volts: 12,

    quantity: 0,

    dutyCycleByHour: [
      0, //midnight to 1am
      0,
      0,
      0,
      0,
      0,
      0, //6 am
      0,
      0,
      0,
      0,
      0,
      0, //noon to 1pm
      0,
      0,
      0,
      0,
      0,
      1, //6 pm
      1,
      1,
      1,
      0,
      0, //11pm to midnight
    ],
  },

  {
    name: 'TV - 32" LCD Smart',
    amazon_asin: 'B00U9U8RZQ',
    details: `Wattage based on the Energy Star info.`,

    currentAC: true,
    watts: 46 / 365 / 5 * 1000,
    volts: 115,

    quantity: 0,

    dutyCycleByHour: [
      0, //midnight to 1am
      0,
      0,
      0,
      0,
      0,
      0, //6 am
      0,
      0,
      0,
      0,
      0,
      0, //noon to 1pm
      0,
      0,
      0,
      0,
      0,
      1, //6 pm
      1,
      1,
      1,
      0,
      0, //11pm to midnight
    ],
  },

  {
    name: 'TV - 40" LCD Smart',
    amazon_asin: 'B00WR292JE',
    details: `Wattage based on the Energy Star info.`,

    currentAC: true,
    watts: 100 / 365 / 5 * 1000,
    volts: 115,

    quantity: 0,

    dutyCycleByHour: [
      0, //midnight to 1am
      0,
      0,
      0,
      0,
      0,
      0, //6 am
      0,
      0,
      0,
      0,
      0,
      0, //noon to 1pm
      0,
      0,
      0,
      0,
      0,
      1, //6 pm
      1,
      1,
      1,
      0,
      0, //11pm to midnight
    ],
  },

  {
    name: 'Electric Blanket',
    amazon_asin: 'B012EJHHNW',
    details: `Wattage based on details page. Assumes running it on a lower setting most of the time in use.`,
    url: 'http://www.electricblanketinstitute.com/features-benefits/actual-cost-to-run.html',

    currentAC: true,
    watts: 35,
    volts: 115,

    quantity: 0,

    dutyCycleByHour: [
      1, //midnight to 1am
      1,
      1,
      1,
      1,
      1,
      1, //6 am
      0,
      0,
      0,
      0,
      0,
      0, //noon to 1pm
      0,
      0,
      0,
      0,
      0,
      0, //6 pm
      0,
      0,
      0,
      0,
      1, //11pm to midnight
    ],
  },

  {
    name: 'Blender - Full Size',
    amazon_asin: 'B00NGV4506',
    details: `Wattage is set at the full 1000, but duty cycle is set for 5 minutes once a day.`,

    currentAC: true,
    watts: 1000,
    volts: 115,

    quantity: 0,

    dutyCycleByHour: [
      0, //midnight to 1am
      0,
      0,
      0,
      0,
      0,
      0, //6 am
      0,
      0,
      0,
      0,
      0,
      0, //noon to 1pm
      0,
      0,
      0,
      0,
      0,
      0.0833, //6 pm
      0,
      0,
      0,
      0,
      0, //11pm to midnight
    ],
  },

  {
    name: 'Car Stereo - Simple',
    amazon_asin: 'B01463W1IU',
    details: `Based on 200W, four speakers. Actual normal power consumption has little to do with the audio wattage.`,

    currentAC: false,
    amps: 1.5,
    volts: 115,

    quantity: 0,

    dutyCycleByHour: [
      0, //midnight to 1am
      0,
      0,
      0,
      0,
      0,
      0, //6 am
      0,
      0,
      0,
      0,
      0,
      1, //noon to 1pm
      1,
      1,
      1,
      0,
      0,
      0, //6 pm
      0,
      0,
      0,
      0,
      0, //11pm to midnight
    ],
  },

  {
    name: 'Fan-Tastic Fan, Low',
    amazon_asin: 'B00HQZB4I4',
    details: `Fan-Tastic Fan on low. 24 hours a day.`,

    currentAC: false,
    amps: 1.8,
    volts: 12,

    quantity: 0,
  },

  {
    name: 'Fan-Tastic Fan, High',
    amazon_asin: 'B00HQZB4I4',
    details: `Fan-Tastic Fan on high. 24 hours a day.`,

    currentAC: false,
    amps: 3,
    volts: 12,

    quantity: 0,
  },
];


export const BasicConsumers = createConsumersFromDefinitions(BasicConsumersDefinitions);
