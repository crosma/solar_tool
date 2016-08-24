import {Component, OnInit, OnChanges, SimpleChange} from '@angular/core';

//data
import {Battery, BatteriesService} from '../services';
import {ConsumersService} from '../services';
import {Consumer} from '../services/consumers'
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

    for (let consumer of this.consumerService.getConsumers()) {
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
  }
}
