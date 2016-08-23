import {Component, OnInit, Input} from '@angular/core';
import {Consumers} from '../../services/consumers'

@Component({
  selector: 'app-consumers',
  templateUrl: 'consumers.component.html',
  styleUrls: ['consumers.component.scss']
})
export class ConsumersComponent implements OnInit {
  @Input() consumers: Consumers;

  constructor() {
  }

  ngOnInit() {
  }
}
