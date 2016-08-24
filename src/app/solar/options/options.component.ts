import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Battery, Batteries, BatteriesService} from '../../services';
import {UserSettingsService} from '../../services/user-settings.service'

@Component({
  selector: 'app-options',
  templateUrl: 'options.component.html',
  styleUrls: ['options.component.scss'],
  providers: [BatteriesService],
})
export class OptionsComponent implements OnInit {
  batteryTypes: Batteries;

  private userSettingsService: UserSettingsService;

  constructor(userSettingsService: UserSettingsService, private batteriesService: BatteriesService) {
    this.batteryTypes = batteriesService.getBatteryTypes();
    this.userSettingsService = userSettingsService;
  }

  ngOnInit() {
    console.log('OptionsComponent::ngOnInit');
  }
}
