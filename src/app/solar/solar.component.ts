import {Component, OnInit, OnChanges, SimpleChange} from '@angular/core';

//data
import {Battery, BatteriesService, ConsumersService, UserSettingsService} from '../services';

//components
import {MainChartComponent} from './main-chart';
import {ConsumersComponent} from './consumers';
import {OptionsComponent} from './options';
import {DataComponent} from './data';


@Component({
  selector: 'app-solar',
  templateUrl: 'solar.component.html',
  styleUrls: ['solar.component.scss'],
  directives: [MainChartComponent, DataComponent, ConsumersComponent, OptionsComponent],
  providers: [ConsumersService, BatteriesService, UserSettingsService],
})
export class SolarComponent implements OnInit {
  consumers;

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

    let consumers = this.consumerService.getConsumers();
    for (var consumer_key in consumers) {
      let consumer = consumers[consumer_key];

      if (consumer.currentAC) {
        this.peakWattsAC += consumer.volts / this.userSettingsService.inverterOutputVolts * consumer.watts * consumer.quantity;

        this.peakWattsSurgeAC += consumer.volts / this.userSettingsService.inverterOutputVolts * consumer.wattsSurge * consumer.quantity;

        this.wattHoursAC += consumer.volts / this.userSettingsService.inverterOutputVolts * consumer.watts * consumer.quantity * consumer.dutyCycle;

      } else {
        this.peakWattsDC += consumer.volts / this.userSettingsService.batteryVoltsDC * consumer.watts * consumer.quantity;
        this.peakWattsSurgeAC += consumer.volts / this.userSettingsService.batteryVoltsDC * consumer.wattsSurge * consumer.quantity;

        this.wattHoursDC += consumer.volts / this.userSettingsService.batteryVoltsDC * consumer.watts * consumer.quantity * consumer.dutyCycle;
      }
    }
  }
}
