import {Component, OnInit} from '@angular/core';
import {ConsumersService, UserSettingsService} from '../../services';
import {Consumers} from '../../services/consumers'

@Component({
  selector: 'app-consumers',
  templateUrl: 'consumers.component.html',
  styleUrls: ['consumers.component.scss']
})
export class ConsumersComponent implements OnInit {
  consumers: Consumers;


  constructor(private userSettingsService: UserSettingsService, private consumerService: ConsumersService) {
    this.consumers = consumerService.getConsumers();
  }

  ngOnInit() {

  }

  getQuantity(consumer) {
    return this.userSettingsService.getConsumerQuantityByName(consumer.name, consumer.quantity);
  }

  setQuantity(consumer, event) {
      this.userSettingsService.setConsumerQuantityByName(consumer.name, parseInt(event.target.value));
  }
}
