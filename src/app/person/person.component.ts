import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {PersonService} from './person.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subscription, Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import { PARENT_INJECTOR } from '@angular/core/src/render3/interfaces/injector';

@Component ({
selector: 'app-person',
templateUrl: './person.component.html'

})

export class PersonComponent implements OnInit, OnDestroy {

personList ;
PatAddress;
PatMRN;
PatGender;
PatTelecom;
DateOfBirth;
BAIRTHDATE;
PatCond;
CondStat;
Condverf;
isFetching = false;
private perSubList: Subscription;
constructor(private prsService: PersonService) {
}

ngOnInit() {


  this.prsService.fetchPerson();

  this.perSubList = this.prsService.PatientName.subscribe(person => {
    this.personList = person.slice (0, 15);
    this.isFetching = false;
  });
  this.perSubList = this.prsService.PateintAddress.subscribe(address => {
    this.PatAddress = address;
  });
  this.perSubList = this.prsService.Dob.subscribe(identifier => {
    this.PatMRN = identifier.slice(17, 60);
  });

  this.perSubList = this.prsService.Dob.subscribe(gender => {
  this.PatGender = gender.slice(11, 17);
  });

  this.perSubList = this.prsService.Dob.subscribe(birthDate => {
  this.DateOfBirth = birthDate.slice (0, 10);
  });


  this.perSubList = this.prsService.PatientName.subscribe(telecom => {
  this.PatTelecom = telecom.slice(16, 50);
  });
  this.perSubList = this.prsService.PatientCond.subscribe(PatientCond => {
  this.PatCond = PatientCond. slice(16, 250);
    });

  this.perSubList = this.prsService.PatientCond.subscribe(CondStatus => {
  this.CondStat = CondStatus.slice (0, 10);
  });

  this.perSubList = this.prsService.PatientCond.subscribe(CondVerf => {
  this.Condverf = CondVerf.slice (10, 16);
  });

  this.isFetching = true;
}

ngOnDestroy()
{
this.perSubList.unsubscribe();
}
}
