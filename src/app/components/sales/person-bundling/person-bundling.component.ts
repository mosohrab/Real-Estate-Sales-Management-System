import { Component, OnInit, Input } from '@angular/core';
import { WeBaseComponent } from '../../we-base.component';

import { PersonBundlingType } from '../../../model/sales.model';

@Component({
  selector: 'app-person-bundling',
  templateUrl: './person-bundling.component.html',
  styleUrls: ['./person-bundling.component.scss']
})
export class PersonBundlingComponent extends WeBaseComponent {

  @Input() salePlanId:number;
  fillterByPersonAndCompany:PersonBundlingType;
  fillterByPerson:PersonBundlingType;
  fillterByCompany:PersonBundlingType;

  constructor() {
    super();

    this.fillterByPersonAndCompany=PersonBundlingType.PersonAndCompany;
    this.fillterByPerson=PersonBundlingType.Person;
    this.fillterByCompany=PersonBundlingType.Company;
  }



}
