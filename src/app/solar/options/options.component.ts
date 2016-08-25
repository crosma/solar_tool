import {Component, OnInit} from '@angular/core';
import {Batteries, BatteriesService, UserSettingsService} from '../../services';

@Component({
  selector: 'app-options',
  templateUrl: 'options.component.html',
  styleUrls: ['options.component.scss'],
  providers: [BatteriesService],
})
export class OptionsComponent {
  batteryTypes: Batteries;

  constructor(private userSettingsService: UserSettingsService, private batteriesService: BatteriesService) {
    this.batteryTypes = batteriesService.getBatteryTypes();
    this.userSettingsService = userSettingsService;
  }
}
