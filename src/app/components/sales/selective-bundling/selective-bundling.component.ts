import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-selective-bundling',
  templateUrl: './selective-bundling.component.html',
  styleUrls: ['./selective-bundling.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectiveBundlingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
