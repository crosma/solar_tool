import {Component, OnInit} from '@angular/core';
import {Batteries, BatteriesService, UserSettingsService, JunkService} from '../../services';

@Component({
  selector: 'app-options',
  templateUrl: 'options.component.html',
  styleUrls: ['options.component.scss'],
})
export class OptionsComponent {
  batteryTypes: Batteries;
  zeroToEleven = [];

  constructor(private userSettingsService: UserSettingsService, private batteriesService: BatteriesService, private junkService: JunkService) {
    this.batteryTypes = batteriesService.getBatteryTypes();
    this.userSettingsService = userSettingsService;
    this.junkService = junkService;

    //noinspection TypeScriptUnresolvedFunction
    this.zeroToEleven = Array.from(Array(12),(x,i)=>i);
  }
}
