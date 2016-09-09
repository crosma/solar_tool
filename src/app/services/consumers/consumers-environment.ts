import {ConsumerDefinitions} from './consumer'

export const DefinitionsEnvironment: ConsumerDefinitions = [
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
