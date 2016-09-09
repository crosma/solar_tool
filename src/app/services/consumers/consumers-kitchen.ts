import {ConsumerDefinitions} from './consumer'

export const DefinitionsKitchen: ConsumerDefinitions = [
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
];
