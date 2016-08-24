import {Component, OnInit, OnChanges, SimpleChange} from '@angular/core';

//data
import {Battery, Batteries, BatteriesService} from '../services';
import {ConsumersService} from '../services';
import {Consumer, BasicConsumers} from '../services/consumers'
import {UserSettingsService} from '../services/user-settings.service'

//components
import {MainChartComponent} from './main-chart';
import {ConsumersComponent} from './consumers';
import {OptionsComponent} from './options';

@Component({
  selector: 'app-solar',
  templateUrl: 'solar.component.html',
  styleUrls: ['solar.component.scss'],
  directives: [MainChartComponent, ConsumersComponent, OptionsComponent],
  providers: [UserSettingsService, ConsumersService, BatteriesService],
})
export class SolarComponent implements OnInit {
  consumers: Consumer[];

  peakWattsAC = 0;
  peakWattsSurgeAC = 0;
  wattHoursAC = 0;

  selectedBattery: Battery;

  peakWattsDC = 0;
  peakWattsSurgeDC = 0;
  wattHoursDC = 0;

  hours: GraphPoints = [];
  chartData = [];

  constructor(private userSettingsService: UserSettingsService, private consumerService: ConsumersService, private batteriesService: BatteriesService) {
    this.consumers = consumerService.getConsumers();
  }

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
        this.peakWattsAC += consumer.volts / this.userSettingsService.inverterOutputVolts * consumer.watts * consumer.quantity;

        this.peakWattsSurgeAC += consumer.volts / this.userSettingsService.inverterOutputVolts * consumer.wattsSurge * consumer.quantity;

        this.wattHoursAC += consumer.volts / this.userSettingsService.inverterOutputVolts * consumer.watts * consumer.quantity * consumer.dutyCycle * consumer.getHoursPerDay();

      } else {
        this.peakWattsDC += consumer.volts / this.userSettingsService.batteryVoltsDC * consumer.watts * consumer.quantity;
        this.peakWattsSurgeAC += consumer.volts / this.userSettingsService.batteryVoltsDC * consumer.wattsSurge * consumer.quantity;

        this.wattHoursDC += consumer.volts / this.userSettingsService.batteryVoltsDC * consumer.watts * consumer.quantity * consumer.dutyCycle * consumer.getHoursPerDay();
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

    let currentBatteryAmps = this.userSettingsService.batteryAmpHours;
    this.chartData = [];

    this.hours = [];
    for (let day = 1; day <= 3; day++) {
      for (var h = 0; h < 24; h++) {
        var hour: GraphPoint = {
          createdAmps: this.userSettingsService.solarWatts / this.userSettingsService.solarVolts * solarHours[h],
          usedAmps: 0,
        };

        let wattsAC = 0;
        for (let consumer of BasicConsumers) {
          if (!consumer.getHour(h)) continue;

          if (consumer.currentAC) {
            wattsAC += consumer.volts / this.userSettingsService.inverterOutputVolts * consumer.watts * consumer.quantity * consumer.dutyCycle;// * consumer.getHoursPerDay();
          } else {
            hour.usedAmps += consumer.volts / this.userSettingsService.batteryVoltsDC * consumer.watts * consumer.quantity * consumer.dutyCycle / this.userSettingsService.batteryVoltsDC;// * consumer.getHoursPerDay();
          }
        }

        hour.usedAmps += wattsAC / this.userSettingsService.batteryVoltsDC * (100 / this.userSettingsService.inverterEfficiency);

        this.hours.push(hour);

        //todo pass the hours array to the chart, build chartData in chart code
        this.chartData.push([
          {v: (day - 1) * 24 + h, f: `Day ${day}, Hour ${this.hourToAmPm(h)}`},
          //`Day ${day}, Hour ${this.hourToAmPm(h)}`,
          hour.createdAmps,
          hour.usedAmps,
          currentBatteryAmps,
          currentBatteryAmps < this.userSettingsService.batteryAmpHours * 0.5 ? 'color: #FF0000' : '',
          this.userSettingsService.batteryAmpHours * 0.5,
          false,
          this.userSettingsService.batteryAmpHours * 0.4,
          false,
          this.userSettingsService.batteryAmpHours * 0.3,
          false,
        ]);

        currentBatteryAmps -= hour.usedAmps;
        currentBatteryAmps += hour.createdAmps;
        currentBatteryAmps = Math.max(Math.min(currentBatteryAmps, this.userSettingsService.batteryAmpHours), 0);
      } // for h
    } // for day
  }

  hourToAmPm(hour) {
    if (hour == 0) return '12AM';
    else if (hour < 12) return `${hour}AM`;
    else if (hour == 12) return '12PM';
    else return `${hour - 12}PM`;
  }
}

export interface GraphPoint {
  createdAmps: number;
  usedAmps: number;
}

export declare type GraphPoints = GraphPoint[];
