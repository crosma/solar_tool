import {Component, OnInit} from '@angular/core';

//data
import {Battery, Batteries, BatteriesService} from '../services';
import {ConsumersService} from '../services';
import {Consumer, BasicConsumers} from '../services/consumers'

//components
import { MainChartComponent } from './main-chart'; //TODO: Probably does not need to be global

@Component({
  // moduleId: module.id,
  selector: 'app-solar',
  templateUrl: 'solar.component.html',
  styleUrls: ['solar.component.scss'],
  directives: [MainChartComponent],
  providers: [ConsumersService, BatteriesService],
})
export class SolarComponent implements OnInit {
  consumers: Consumer[];

  user_data = {
    batteryVoltsDC: 12,
    batteryAmpHours: 200,
    selectedBatteryIndex: 0,

    solarVolts: 12,
    solarWatts: 300,

    inverterEfficiency: 90,
    inverterOutputVolts: 110,
  };

  peakWattsAC = 0;
  peakWattsSurgeAC = 0;
  wattHoursAC = 0;

  batteryTypes: Batteries;
  selectedBattery: Battery;

  peakWattsDC = 0;
  peakWattsSurgeDC = 0;
  wattHoursDC = 0;

  hours: GraphPoints = [];
  chartData = [];

  constructor(consumerService: ConsumersService, batteriesService: BatteriesService) {
    this.consumers = consumerService.getConsumers();

    this.batteryTypes = batteriesService.getBatteryTypes();
    this.selectedBattery = this.batteryTypes[0];
  }

  ngOnInit() {
    this.loadData();

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
        this.peakWattsAC += consumer.volts / this.user_data.inverterOutputVolts * consumer.watts * consumer.quantity;

        this.peakWattsSurgeAC += consumer.volts / this.user_data.inverterOutputVolts * consumer.wattsSurge * consumer.quantity;

        this.wattHoursAC += consumer.volts / this.user_data.inverterOutputVolts * consumer.watts * consumer.quantity * consumer.dutyCycle * consumer.getHoursPerDay();

      } else {
        this.peakWattsDC += consumer.volts / this.user_data.batteryVoltsDC * consumer.watts * consumer.quantity;
        this.peakWattsSurgeAC += consumer.volts / this.user_data.batteryVoltsDC * consumer.wattsSurge * consumer.quantity;

        this.wattHoursDC += consumer.volts / this.user_data.batteryVoltsDC * consumer.watts * consumer.quantity * consumer.dutyCycle * consumer.getHoursPerDay();
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

    let currentBatteryAmps = this.user_data.batteryAmpHours;
    this.chartData = [];

    this.hours = [];
    for (let day = 1; day <= 3; day++) {
      for (var h = 0; h < 24; h++) {
        var hour: GraphPoint = {
          createdAmps: this.user_data.solarWatts / this.user_data.solarVolts * solarHours[h],
          usedAmps: 0,
        };

        let wattsAC = 0;
        for (let consumer of BasicConsumers) {
          if (!consumer.getHour(h)) continue;

          if (consumer.currentAC) {
            wattsAC += consumer.volts / this.user_data.inverterOutputVolts * consumer.watts * consumer.quantity * consumer.dutyCycle;// * consumer.getHoursPerDay();
          } else {
            hour.usedAmps += consumer.volts / this.user_data.batteryVoltsDC * consumer.watts * consumer.quantity * consumer.dutyCycle / this.user_data.batteryVoltsDC;// * consumer.getHoursPerDay();
          }
        }

        hour.usedAmps += wattsAC / this.user_data.batteryVoltsDC * (100 / this.user_data.inverterEfficiency);

        this.hours.push(hour);

        //todo pass the hours array to the chart, build chartData in chart code
        this.chartData.push([
          {v: (day - 1) * 24 + h, f: `Day ${day}, Hour ${this.hourToAmPm(h)}`},
          //`Day ${day}, Hour ${this.hourToAmPm(h)}`,
          hour.createdAmps,
          hour.usedAmps,
          currentBatteryAmps,
          currentBatteryAmps < this.user_data.batteryAmpHours * 0.5 ? 'color: #FF0000' : '',
          this.user_data.batteryAmpHours * 0.5,
          false,
          this.user_data.batteryAmpHours * 0.4,
          false,
          this.user_data.batteryAmpHours * 0.3,
          false,
        ]);

        currentBatteryAmps -= hour.usedAmps;
        currentBatteryAmps += hour.createdAmps;
        currentBatteryAmps = Math.max(Math.min(currentBatteryAmps, this.user_data.batteryAmpHours), 0);
      } // for h
    } // for day
  }

  doSomethingTimeout = null;

  doSomething(newValue) {
    this.doSomethingTimeout && clearTimeout(this.doSomethingTimeout);
    this.doSomethingTimeout = setTimeout(() => {
      this.update();

      this.saveData();
    }, 50);
  }

  updateSelectedBattery(index) {
    this.selectedBattery = this.batteryTypes[index];

    this.doSomething(index);

    this.saveData();
  }

  hourToAmPm(hour) {
    if (hour == 0) return '12AM';
    else if (hour < 12) return `${hour}AM`;
    else if (hour == 12) return '12PM';
    else return `${hour - 12}PM`;
  }

  saveData() {
    if (window.localStorage) {
      window.localStorage['user_data'] = JSON.stringify(this.user_data);
    }
  }

  loadData() {
    if (window.localStorage) {
      try {
        var saved_data = JSON.parse(window.localStorage['user_data']);

        Object.keys(saved_data).forEach((key) => {
          if (this.user_data[key]) this.user_data[key] = saved_data[key];
        });

        this.selectedBattery = this.batteryTypes[this.user_data.selectedBatteryIndex];
      } catch (e) {
        console.warn('Failed to load user_data.', e);
      }
    }
  }
}

export interface GraphPoint {
  createdAmps: number;
  usedAmps: number;
}

export declare type GraphPoints = GraphPoint[];
