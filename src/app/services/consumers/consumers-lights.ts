import {ConsumerDefinitions} from './consumer'

export const DefinitionsLights: ConsumerDefinitions = [
  {
    name: 'LED - Small',
    amazon_asin: 'B00ODSAQBI',

    volts: 12,
    watts: 2,

    quantity: 6,
  },

  {
    name: 'LED - 60Watt  Equivalent',
    amazon_asin: 'B005EPRFKO',

    currentAC: true,
    watts: 8.5,
    volts: 12,

    quantity: 0,
  },

  {
    name: 'Incandescent - 60Watt',
    amazon_asin: 'B00L9H5RWY',

    currentAC: true,
    watts: 60,
    volts: 12,

    quantity: 0,
  },
];
