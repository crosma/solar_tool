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
    var div = this.myElement.nativeElement.getElementsByTagName("div");
    this.containerElement = div[0];

    this.updateGraph();
  }

  ngOnChanges() {
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
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Day, Hour'); // Implicit domain column.
      data.addColumn('number', 'Amps Created'); // Implicit user_data column.
      data.addColumn('number', 'Amps Consumed'); // Implicit user_data column.

      data.addColumn('number', 'Battery Charge Level'); // Implicit user_data column.
      data.addColumn({'type': 'string', 'role': 'style'});

      data.addColumn('number', 'Battery Safe Minimum');
      data.addColumn({type:'boolean', role: 'certainty'});

      data.addColumn('number', 'Battery Warning Minimum');
      data.addColumn({type:'boolean', role: 'certainty'});

      data.addColumn('number', 'Battery Danger Minimum');
      data.addColumn({type:'boolean', role: 'certainty'});
      //user_data.addColumn({type:'number', role: 'interval'});
      //user_data.addColumn('number', 'Expenses');

      data.addRows(this.data);


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
      formatAhNoDigits.format(data, 7);
      formatAhNoDigits.format(data, 9);

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
            max: this.batteryAmpHours,
            min: 0
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
          2: {type: 'line'},
          3: {type: 'line', visibleInLegend: false},
          4: {type: 'line', visibleInLegend: false},
          5: {type: 'line', visibleInLegend: false},
        },
      });
    }, 100);
  }
}
