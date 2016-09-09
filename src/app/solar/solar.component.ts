import {Component, OnInit, OnChanges, SimpleChange} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

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

  peakWattsDC = 0;
  peakWattsSurgeDC = 0;
  wattHoursDC = 0;

  private sub: Subscription;

  tabs = [
    {id: 'consumers', name: 'Power Consumers'},
    {id: 'config', name: 'Configuration'},
    {id: 'data', name: 'Data'},
  ];
  current_tab_id = this.tabs[0].id;

  constructor(private userSettingsService: UserSettingsService,
              private consumerService: ConsumersService,
              private route: ActivatedRoute,
              private router: Router) {

    this.consumers = consumerService.getConsumers();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['tab']) {
        this.current_tab_id = params['tab'];
      }
    });

    this.update();
  }

  setTab(tab) {
    this.router.navigate(['/calculator', {
      tab: tab.id
    }]);

    return false;
  }

  isSelectedTab(id) {
    return id == this.current_tab_id;
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
