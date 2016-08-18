import {Component, Input, OnInit, OnChanges, ElementRef} from '@angular/core';
import 'rxjs/add/operator/debounceTime';

declare var google: any;

@Component({
  selector: 'app-main-chart',
  templateUrl: 'main-chart.component.html',
  styleUrls: ['main-chart.component.scss']
})
export class MainChartComponent implements OnInit, OnChanges {
  @Input() data = null;
  @Input() batteryAmpHours: number = 0;

  chartHasLoaded = false;
  updateGraphTimeout = null;
  containerElement = null;
  myElement = null;

  constructor(myElement: ElementRef) {
    google.charts.setOnLoadCallback(this.chartOnLoad.bind(this));

    this.myElement = myElement;
  }

  ngOnInit() {
    console.log('ngOnInit');

    var div = this.myElement.nativeElement.getElementsByTagName("div");
    this.containerElement = div[0];

    this.updateGraph();
  }

  ngOnChanges() {
    console.log('ngOnChanges');

    this.updateGraph();
  }


  chartOnLoad() {
    this.chartHasLoaded = true;
    this.updateGraph();
  }

  updateGraph() {
    if (!this.data || !this.chartHasLoaded) return;

    this.updateGraphTimeout && clearTimeout(this.updateGraphTimeout);
    this.updateGraphTimeout = setTimeout(() => {
      console.log('Updating graph.');

      var chart = new google.visualization.ComboChart(this.containerElement);
      chart.draw(google.visualization.arrayToDataTable(this.data), {
        height: 300,
        chartArea: {
          top: 7,
          right: 0,
          bottom: 40,
          left: 45,
        },
        //width: '100%',
        legend: {position: 'bottom'},
        vAxis: {
          title: 'Amp Hours',
          viewWindowMode: 'explicit',
          viewWindow: {
            max: this.batteryAmpHours,
            min: 0
          }
        },
        hAxis: {
          title: 'Day, Hour',
          ticks: [0, 12, 24, 36, 48, 60, 72],
        },
        seriesType: 'bars',
        series: {2: {type: 'line'}},
      });
    }, 100);
  }
}
