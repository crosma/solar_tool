import {Injectable, Inject} from '@angular/core';
import {Battery, Batteries, BatteriesService} from '../services';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class UserSettingsService {
  private settings = {
    batteryVoltsDC: 12,
    batteryAmpHours: 200,
    selectedBatteryIndex: 0,

    solarVolts: 12,
    solarWatts: 300,

    inverterEfficiency: 90,
    inverterOutputVolts: 110,
  };

  private settingsChangedSourceSubject = new Subject();
  settingsChanged$ = this.settingsChangedSourceSubject.asObservable();

  private _selectedBattery: Battery;

  constructor(@Inject(BatteriesService) private batteriesService: BatteriesService) {
    this.load();
  }

  private load() {
    if (window.localStorage) {
      try {
        var saved_data = JSON.parse(window.localStorage['user_data']);

        Object.keys(saved_data).forEach((key) => {
          if (this.settings[key]) this.settings[key] = saved_data[key];
        });

        this._selectedBattery = this.batteriesService.getBatteryTypes()[this.selectedBatteryIndex];
      } catch (e) {
        console.warn('Failed to load userData.', e);
      }
    }
  }

  private save() {
    this.settingsChangedSourceSubject.next();

    if (window.localStorage) {
      window.localStorage['user_data'] = JSON.stringify(this.settings);
    }
  }

  get batteryVoltsDC(): number {
    return this.settings.batteryVoltsDC;
  }

  set batteryVoltsDC(value: number) {
    this.settings.batteryVoltsDC = value;
    this.save();
  }

  get batteryAmpHours(): number {
    return this.settings.batteryAmpHours;
  }

  set batteryAmpHours(value: number) {
    this.settings.batteryAmpHours = value;
    this.save();
  }

  get selectedBatteryIndex(): number {
    return this.settings.selectedBatteryIndex;
  }

  set selectedBatteryIndex(value: number) {
    this.settings.selectedBatteryIndex = value;
    this._selectedBattery = this.batteriesService.getBatteryTypes()[value];
    this.save();
  }

  get selectedBattery(): Battery {
    return this._selectedBattery;
  }

  /*
   set selectedBattery(value: Battery) {
   this._selectedBattery = value;
   this.save();
   }
   */


  get solarVolts(): number {
    return this.settings.solarVolts;
  }

  set solarVolts(value: number) {
    this.settings.solarVolts = value;
    this.save();
  }

  get solarWatts(): number {
    return this.settings.solarWatts;
  }

  set solarWatts(value: number) {
    this.settings.solarWatts = value;
    this.save();
  }


  get inverterEfficiency(): number {
    return this.settings.inverterEfficiency;
  }

  set inverterEfficiency(value: number) {
    this.settings.inverterEfficiency = value;
    this.save();
  }

  get inverterOutputVolts(): number {
    return this.settings.inverterOutputVolts;
  }

  set inverterOutputVolts(value: number) {
    this.settings.inverterOutputVolts = value;
    this.save();
  }
}
