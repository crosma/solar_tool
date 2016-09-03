import {Component, Input, OnInit, ElementRef} from '@angular/core';
import {Battery, BatteriesService, ConsumersService, UserSettingsService, JunkService} from '../../services';

declare var google: any;

@Component({
  selector: 'app-main-chart',
  templateUrl: 'main-chart.component.html',
  styleUrls: ['main-chart.component.scss']
})
export class MainChartComponent implements OnInit {
  chartHasLoaded = false;
  containerElement = null;
  myElement = null;

  constructor(myElement: ElementRef,
              private userSettingsService: UserSettingsService,
              private consumerService: ConsumersService,
              private batteriesService: BatteriesService,
              private junkService: JunkService) {

    google.charts.setOnLoadCallback(this.chartOnLoad.bind(this));

    this.myElement = myElement;

    userSettingsService.settingsChanged$.subscribe(() => {
      this.updateGraph();
    });
  }

  ngOnInit() {
    var div = this.myElement.nativeElement.getElementsByClassName("chart");
    this.containerElement = div[0];

    this.updateGraph();
  }

  onResize() {
    this.updateGraph();
  }

  chartOnLoad() {
    this.chartHasLoaded = true;
    this.updateGraph();
  }

  //TODO: Debounce this function!
  updateGraph() {
    if (!this.chartHasLoaded) return;

    let inverterRatio = 100 / this.userSettingsService.inverterEfficiency;
    let currentBatteryAmps = this.userSettingsService.batteryAmpHours; //start at 100% battery charge
    let solarEfficiency = this.userSettingsService.solarEfficiency / 100;
    let solarSunMonth = this.junkService.sunByMonth[this.userSettingsService.month];
    let chartData = [];
    var qty;

    for (let day = 1; day <= 3; day++) {
      for (var h = 0; h < 24; h++) {
        var hour: GraphPoint = {
          createdAmps: this.userSettingsService.solarWatts / this.userSettingsService.solarVolts * this.junkService.sunByHour[h] * solarEfficiency * solarSunMonth,
          usedAmps: 0,
        };

        for (let consumer of this.consumerService.getConsumers()) {
          let dutyCycle = consumer.getDutyCycleByHour(h);
          if (!dutyCycle) continue;

          let qty = this.userSettingsService.getConsumerQuantityByName(consumer.name, consumer.quantity);
          let total_watts = consumer.watts * qty * dutyCycle;

          //console.log(day, h, consumer.name, consumer.watts, qty, consumer.getDutyCycleByHour(h));

          if (consumer.currentAC) {
            hour.usedAmps += total_watts / this.userSettingsService.batteryVoltsDC * inverterRatio;
          } else {
            hour.usedAmps += total_watts / this.userSettingsService.batteryVoltsDC;
          }
        }

        //todo pass the dutyCycleHours array to the chart, build chartData in chart code
        chartData.push([
          {v: (day - 1) * 24 + h, f: `Day ${day}, Hour ${this.hourToAmPm(h)}`},
          currentBatteryAmps,
          this.batteryChargeColor(this.userSettingsService.battery, currentBatteryAmps / this.userSettingsService.batteryAmpHours * 100), //color line if dips too low
          hour.createdAmps,
          hour.usedAmps,
          this.userSettingsService.batteryAmpHours * this.userSettingsService.battery.minimumLevel / 100,
          this.userSettingsService.batteryAmpHours * this.userSettingsService.battery.warningLevel / 100,
          this.userSettingsService.batteryAmpHours * this.userSettingsService.battery.dangerLevel / 100,
        ]);

        currentBatteryAmps -= hour.usedAmps;
        currentBatteryAmps += hour.createdAmps;
        currentBatteryAmps = Math.max(Math.min(currentBatteryAmps, this.userSettingsService.batteryAmpHours), 0);
      } // for h
    } // for day


    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Day, Hour'); // Implicit domain column.

    data.addColumn('number', 'Battery Charge Level'); // Implicit user_data column.
    data.addColumn({'type': 'string', 'role': 'style'});

    data.addColumn('number', 'Amps Created'); // Implicit user_data column.
    data.addColumn('number', 'Amps Consumed'); // Implicit user_data column.

    data.addColumn('number', 'Battery Safe Minimum');
    data.addColumn('number', 'Battery Warning Minimum');
    data.addColumn('number', 'Battery Danger Minimum');

    data.addRows(chartData);


    var formatAhTwoDigits = new google.visualization.NumberFormat({
      fractionDigits: 2,
      suffix: 'Ah'
    });
    formatAhTwoDigits.format(data, 3);

    var formatAhNoDigits = new google.visualization.NumberFormat({
      fractionDigits: 0,
      suffix: 'Ah'
    });
    formatAhNoDigits.format(data, 5);
    formatAhNoDigits.format(data, 6);
    formatAhNoDigits.format(data, 7);

    var chart = new google.visualization.ComboChart(this.containerElement);
    chart.draw(data, {
      height: 300,
      chartArea: {
        top: 7,
        right: 0,
        bottom: 40,
        left: 45,
      },
      legend: {
        position: 'bottom'
      },
      vAxis: {
        title: 'Amp Hours',
        viewWindowMode: 'explicit',
        viewWindow: {
          max: this.userSettingsService.batteryAmpHours * 1.03,
          min: this.userSettingsService.batteryAmpHours * -0.03
        }
      },
      hAxis: {
        title: 'Day, Hour',
        ticks: [0, 12, 24, 36, 48, 60, 72],
        viewWindow: {
          max: 73,
          min: -1
        }
      },
      seriesType: 'bars',
      series: {
        0: {
          type: 'line',
          color: '#32CD32'
        },
        1: {
          color: '#303F9F',
        },
        2: {
          color: '#D50000',
        },
        3: {
          type: 'line',
          visibleInLegend: true,
          color: '#cccc00',
          lineWidth: this.userSettingsService.battery.minimumLevel ? 2 : 0,
          lineDashStyle: [4, 4],
        },
        4: {
          type: 'line',
          visibleInLegend: false,
          color: '#cc8500',
          lineWidth: this.userSettingsService.battery.warningLevel ? 2 : 0,
          lineDashStyle: [4, 4],
        },
        5: {
          type: 'line',
          visibleInLegend: false,
          color: '#cc0000',
          lineWidth: this.userSettingsService.battery.dangerLevel ? 2 : 0,
          lineDashStyle: [4, 4],
        },
      },
    });
  }

  hourToAmPm(hour) {
    if (hour == 0) return '12AM';
    else if (hour < 12) return `${hour}AM`;
    else if (hour == 12) return '12PM';
    else return `${hour - 12}PM`;
  }

  batteryChargeColor(battery: Battery, charge) {
    if (charge <= battery.dangerLevel) return '#cc0000';
    else if (charge <= battery.warningLevel) return '#cc8500';
    else if (charge <= battery.minimumLevel) return '#cccc00';
    else return 'green';
  }
}

//TODO: Move these?
export interface GraphPoint {
  createdAmps: number;
  usedAmps: number;
}

export declare type GraphPoints = GraphPoint[];
