import {Injectable} from '@angular/core';

@Injectable()
export class JunkService {

  sunByMonth = [
    0.46,
    0.55,
    0.76,
    0.85,
    0.91,
    0.96,
    0.96,
    1,
    0.89,
    0.81,
    0.72,
    0.6,
  ];

  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  sunByHour = [
    0,
    0,
    0,
    0,
    0.02,
    0.1,
    0.24,
    0.44,
    0.64,
    0.81,
    0.95,
    1,
    0.95,
    0.85,
    0.69,
    0.51,
    0.33,
    0.18,
    0.04,
    0,
    0,
    0,
    0,
    0,
  ]

  constructor() {
  }

}
