import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { PersonService } from "./person.service";
import { Subscription, Subject } from "rxjs";

@Component({
  selector: "app-person",
  templateUrl: "./person.component.html",
})
export class PersonComponent implements OnInit, OnDestroy {
  personList;
  PatAddress;
  PatMRN;
  PatGender;
  PatTelecom;
  DateOfBirth;
  BAIRTHDATE;
  PatCond;
  Condition;
  ConditionVal;
  ObservationCode;
  ObservationVal;
  isFetching = false;

  private perSubList: Subscription;
  constructor(private prsService: PersonService) {}

  ngOnInit() {
    this.prsService.fetchPerson();

    this.perSubList = this.prsService.PatientName.subscribe((person) => {
      this.personList = person.slice(0, 15);
      this.isFetching = false;
    });
    this.perSubList = this.prsService.PateintAddress.subscribe((address) => {
      this.PatAddress = address;
    });
    this.perSubList = this.prsService.Dob.subscribe((identifier) => {
      this.PatMRN = identifier.slice(17, 60);
    });

    this.perSubList = this.prsService.Dob.subscribe((gender) => {
      this.PatGender = gender.slice(11, 17);
    });

    this.perSubList = this.prsService.Dob.subscribe((birthDate) => {
      this.DateOfBirth = birthDate.slice(0, 10);
    });

    this.perSubList = this.prsService.PatientName.subscribe((telecom) => {
      this.PatTelecom = telecom.slice(16, 50);
    });

    this.perSubList = this.prsService.PatientCondition.subscribe(
      (Pcondition) => {
        this.Condition = JSON.stringify(Pcondition, ["clinicalStatus"]["code"]);
      }
    );
    this.perSubList = this.prsService.PatientCondition.subscribe(
      (PconditionVal) => {
        this.ConditionVal = JSON.stringify(PconditionVal, ["text"]);
      }
    );

    this.perSubList = this.prsService.PatientObs.subscribe((PObservation) => {
      this.ObservationVal = JSON.stringify(PObservation, ["value"]);
    });

    this.perSubList = this.prsService.PatientObs.subscribe((PObservation) => {
      this.ObservationCode = JSON.stringify(PObservation, ["code"]);
    });

    this.isFetching = true;
  }

  ngOnDestroy() {
    this.perSubList.unsubscribe();
  }
}
