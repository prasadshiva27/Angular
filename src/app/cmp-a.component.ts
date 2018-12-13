import { Component, OnInit } from '@angular/core';
import { LogService } from './log.service';

@Component({
  selector: 'app-cmp-a',
  template: `
  <div>
    <input type="text" #inputVar>
    <button (click) = "onLog(inputVar.value)" > Log </button>
    <button (click) = "onStore()" > Store </button>
    <button (click) = "onSend()" > Send </button>
  </div>
  <hr>
  <div>
        <button (click)="onGet()">Refresh Storage</button>
        <h3>Storage</h3>
        <ul>
            <li *ngFor="let item of items">{{item}}</li>
        </ul>
        <h3>Received Value</h3>
        <p>{{value}}</p>
    </div>
  `,
  providers: [LogService]
})
export class CmpAComponent implements OnInit {

  constructor(private logservice: LogService) { }

  ngOnInit() {
  }

  onLog(value: string)
  {
    this.logservice.writeToLog(value);
  }

}
