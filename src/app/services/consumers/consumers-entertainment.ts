import {ConsumerDefinitions} from './consumer'

export const DefinitionsEntertainment: ConsumerDefinitions = [
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
];
