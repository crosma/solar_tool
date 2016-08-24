import {Injectable, Inject} from '@angular/core';
import {Battery, Batteries, BatteriesService} from '../services';
import {Subject} from 'rxjs/Subject';

interface SettingUpdate {
  key: string;
  val: any;
}

@Injectable()
export class UserSettingsService {
  private settings = {
    batteryVoltsDC: 12,
    batteryAmpHours: 200,
    batteryIndex: 0,

    solarVolts: 12,
    solarWatts: 300,

    inverterEfficiency: 90,
    inverterOutputVolts: 110,
  };

  private settingsChangedSource = new Subject<SettingUpdate>();
  settingsChanged$ = this.settingsChangedSource.asObservable();

  private _battery: Battery;

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

        this._battery = this.batteriesService.getBatteryTypes()[this.batteryIndex];
      } catch (e) {
        console.warn('Failed to load userData.', e);
      }
    }
  }

  //TODO: Debounce this function
  private save() {
    if (window.localStorage) {
      window.localStorage['user_data'] = JSON.stringify(this.settings);
    }
  }

  private updateValue(key:string, val:any) {
    if (this.settings[key] !== val) { //only update if changed
      console.log('user settings changed');

      this.settings[key] = val; //store value
      this.settingsChangedSource.next({key, val}); //fire event

      this.save(); //save settings
    }
  }

  get batteryVoltsDC(): number {
    return this.settings.batteryVoltsDC;
  }

  set batteryVoltsDC(value: number) {
    this.updateValue('batteryVoltsDC', value);
  }

  get batteryAmpHours(): number {
    return this.settings.batteryAmpHours;
  }

  set batteryAmpHours(value: number) {
    this.updateValue('batteryAmpHours', value);
  }

  get batteryIndex(): number {
    return this.settings.batteryIndex;
  }

  set batteryIndex(value: number) {
    this._battery = this.batteriesService.getBatteryTypes()[value];
    this.updateValue('batteryIndex', value);
  }

  get battery(): Battery {
    return this._battery;
  }
  /*
   set battery(value: Battery) {
   this._battery = value;
   this.save();
   }
   */


  get solarVolts(): number {
    return this.settings.solarVolts;
  }

  set solarVolts(value: number) {
    this.updateValue('solarVolts', value);
  }

  get solarWatts(): number {
    return this.settings.solarWatts;
  }

  set solarWatts(value: number) {
    this.updateValue('solarWatts', value);
  }


  get inverterEfficiency(): number {
    return this.settings.inverterEfficiency;
  }

  set inverterEfficiency(value: number) {
    this.updateValue('inverterEfficiency', value);
  }

  get inverterOutputVolts(): number {
    return this.settings.inverterOutputVolts;
  }

  set inverterOutputVolts(value: number) {
    this.updateValue('inverterOutputVolts', value);
  }
}
