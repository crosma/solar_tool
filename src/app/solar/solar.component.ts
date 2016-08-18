import {Component, OnInit} from '@angular/core';
import {BasicConsumers} from './consumers-basic';
import {Battery, BatteryTypes} from './batteries';

@Component({
  // moduleId: module.id,
  selector: 'app-solar',
  templateUrl: 'solar.component.html',
  styleUrls: ['solar.component.css'],
})
export class SolarComponent implements OnInit {
  consumers = BasicConsumers;

  peakWattsAC = 0;
  peakWattsSurgeAC = 0;
  wattHoursAC = 0;
  targetVoltsAC = 110;

  batteryVoltsDC = 12;
  batteryAmpHours = 200;
  batteryTypes = BatteryTypes;
  selectedBattery: Battery = BatteryTypes[0];
  selectedBatteryIndex: number = 0;

  peakWattsDC = 0;
  peakWattsSurgeDC = 0;
  wattHoursDC = 0;

  solarVolts = 12;
  solarWatts = 300;

  inverterEfficiency = 90;

  hours: GraphPoints = [];
  chartData = [];

  ngOnInit() {
    this.update();
  }

  update() {
    this.peakWattsAC = 0;
    this.wattHoursAC = 0;
    this.peakWattsSurgeAC = 0;

    this.peakWattsDC = 0;
    this.peakWattsSurgeDC = 0;

    this.wattHoursDC = 0;

    for (let consumer of BasicConsumers) {
      if (consumer.currentAC) {
        this.peakWattsAC += consumer.volts / this.targetVoltsAC * consumer.watts * consumer.quantity;
        this.peakWattsSurgeAC += consumer.volts / this.targetVoltsAC * consumer.wattsSurge * consumer.quantity;

        this.wattHoursAC += consumer.volts / this.targetVoltsAC * consumer.watts * consumer.quantity * consumer.dutyCycle * consumer.getHoursPerDay();

      } else {
        this.peakWattsDC += consumer.volts / this.batteryVoltsDC * consumer.watts * consumer.quantity;
        this.peakWattsSurgeAC += consumer.volts / this.batteryVoltsDC * consumer.wattsSurge * consumer.quantity;

        this.wattHoursDC += consumer.volts / this.batteryVoltsDC * consumer.watts * consumer.quantity * consumer.dutyCycle * consumer.getHoursPerDay();
      }
    }

    var solarHours = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0.25,
      7: 1,
      8: 1,
      9: 1,
      10: 1,
      11: 1,
      12: 1,
      13: 1,
      14: 1,
      15: 1,
      16: 1,
      17: 1,
      18: 1,
      19: 1,
      20: 0.25,
      21: 0,
      22: 0,
      23: 0,
    };

    let currentBatteryAmps = this.batteryAmpHours;
    this.chartData = [];
    this.chartData.push(['Day, Hour', 'Amps Created', 'Amps Consumed', 'Battery Charge']);

    this.hours = [];
    for (let day = 1; day <= 3; day++) {
      for (var h = 0; h < 24; h++) {
        var hour: GraphPoint = {
          createdAmps: this.solarWatts / this.solarVolts * solarHours[h],
          usedAmps: 0,
        };

        let wattsAC = 0;
        for (let consumer of BasicConsumers) {
          if (!consumer.getHour(h)) continue;

          if (consumer.currentAC) {
            wattsAC += consumer.volts / this.targetVoltsAC * consumer.watts * consumer.quantity * consumer.dutyCycle;// * consumer.getHoursPerDay();
          } else {
            hour.usedAmps += consumer.volts / this.batteryVoltsDC * consumer.watts * consumer.quantity * consumer.dutyCycle / this.batteryVoltsDC;// * consumer.getHoursPerDay();
          }
        }

        hour.usedAmps += wattsAC / this.batteryVoltsDC * (100 / this.inverterEfficiency);

        this.hours.push(hour);

        this.chartData.push([
          {v: (day - 1) * 24 + h, f: `Day ${day}, Hour ${h}`} ,
          hour.createdAmps,
          hour.usedAmps,
          currentBatteryAmps
        ]);

        currentBatteryAmps -= hour.usedAmps;
        currentBatteryAmps += hour.createdAmps;
        currentBatteryAmps = Math.max(Math.min(currentBatteryAmps, this.batteryAmpHours), 0);
      } // for h
    } // for day
  }

  doSomethingTimeout = null;

  doSomething(newValue) {
    this.doSomethingTimeout && clearTimeout(this.doSomethingTimeout);
    this.doSomethingTimeout = setTimeout(() => {
      this.update();
    }, 50);
  }

  updateSelectedBattery(index) {
    this.selectedBattery = BatteryTypes[index];

    this.doSomething(index);
  }
}

export interface GraphPoint {
  createdAmps: number;
  usedAmps: number;
}

export declare type GraphPoints = GraphPoint[];
