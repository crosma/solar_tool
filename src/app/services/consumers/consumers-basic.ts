import {ConsumerDefinitions} from './consumer'

export const DefinitionsBasic: ConsumerDefinitions = [
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
    name: 'Wireless Router',
    amazon_asin: 'B008ABOJKS',
    details: `A normal household wireless router. Power consumption is measured while idle.`,

    currentAC: true,
    watts: 9.7,
    volts: 115,

    quantity: 0,
  },

  {
    name: 'Wireless Router - Travel\\Low Power',
    amazon_asin: 'B00JKFE0FW',
    url: 'https://forums.anandtech.com/threads/low-power-wireless-routers-are-there-any-left.2395327/#post-37310510',
    details: `These are good for typical internet usage but will not handle large local file transfers well. Also may not last as long as a normal router.`,

    currentAC: true,
    watts: 0.85,
    volts: 115,

    quantity: 0,
  },

  {
    name: 'Wireless Adapter - 1000mw',
    amazon_asin: 'B00JKFE0FW',
    url: 'https://www.youtube.com/watch?v=5T9lNM8Mukk',
    details: `Power consumption is currently a guess. Use this device with a <a href="https://www.amazon.com/dp/B00X3AL2OC/">Yagi Antenna</a> to pick up wifi at extremely long range.`,

    currentAC: false,
    watts: 2,
    volts: 12,

    quantity: 0,
  },

  {
    name: '4G Cell Phone Booster',
    amazon_asin: 'B00RHMFPEU',
    details: `Before you buy one of these, make 100% sure it <em><strong>fully</strong></em> supports LTE for your cell service. Power consumption is the devices max draw. I cannot find actual consumption data.`,

    currentAC: true,
    amps: 2.5,
    volts: 12,

    quantity: 0,
  },
];
