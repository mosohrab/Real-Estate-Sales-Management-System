import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-parent-bundling',
  templateUrl: './parent-bundling.component.html',
  styleUrls: ['./parent-bundling.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ParentBundlingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
