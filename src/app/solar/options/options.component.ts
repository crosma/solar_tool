import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Battery, Batteries, BatteriesService} from '../../services';

@Component({
  selector: 'app-options',
  templateUrl: 'options.component.html',
  styleUrls: ['options.component.scss'],
  providers: [BatteriesService],
})
export class OptionsComponent implements OnInit {
  @Input() batteryVoltsDC;
  @Output() batteryVoltsDCChange = new EventEmitter();
  @Input() batteryAmpHours;
  @Output() batteryAmpHoursChange = new EventEmitter();
  @Input() selectedBatteryIndex;
  @Output() selectedBatteryIndexChange = new EventEmitter();

  @Input() solarVolts;
  @Output() solarVoltsChange = new EventEmitter();
  @Input() solarWatts;
  @Output() solarWattsChange = new EventEmitter();

  @Input() inverterEfficiency;
  @Output() inverterEfficiencyChange = new EventEmitter();
  @Input() inverterOutputVolts;
  @Output() inverterOutputVoltsChange = new EventEmitter();

  @Input() selectedBattery: Battery;
  @Output() selectedBatteryChange:EventEmitter<Battery> = new EventEmitter<Battery>();

  batteryTypes: Batteries;

  constructor(batteriesService: BatteriesService) {
    this.batteryTypes = batteriesService.getBatteryTypes();
    this.selectedBattery = this.batteryTypes[0];
  }

  ngOnInit() {
    console.log('OptionsComponent::ngOnInit');
  }

  updateSelectedBattery(index) {
    this.selectedBattery = this.batteryTypes[index];
    this.selectedBatteryChange.emit(this.selectedBattery);

    this.selectedBatteryIndexChange.emit(index);
  }

  updateBatteryVoltsDC(val) {
    this.batteryVoltsDCChange.emit(val);
  }
  updateBatteryAmpHours(val) {
    this.batteryAmpHoursChange.emit(val);
  }

  updateSolarVolts(val) {
    this.solarVoltsChange.emit(val);
  }
  updateSolarWatts(val) {
    this.solarWattsChange.emit(val);
  }

  updateInverterEfficiency(val) {
    this.inverterEfficiencyChange.emit(val);
  }
  updateInverterOutputVolts(val) {
    this.inverterOutputVoltsChange.emit(val);
  }
}
