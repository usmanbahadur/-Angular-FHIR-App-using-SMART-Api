import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class PersonService {
  PatientName = new Subject<string>();
  PateintAddress = new Subject<string[]>();
  PatientMrn = new Subject<string[]>();
  PatientObs = new Subject<string>();
  PatientCondition = new Subject<[]>();
  Gender = new Subject<string[]>();
  teleCom = new Subject<string[]>();
  Dob = new Subject<string>();
  person: string[];
  address: string[];
  identifier: string[];
  birth: string[];
  CondStatus = new Subject<string>();
  code: {};
  constructor(private http: HttpClient) {}

  fetchPerson() {
    const FHIRClient = this.http.get<any>(
      "https://r4.smarthealthit.org/Patient/87a339d0-8cae-418e-89c7-8651e6aab3c6"
    );

    FHIRClient.pipe(
      map((resData) => {
        return (
          resData.name.map(
            (GivenName: { family: any; given: any }) =>
              GivenName.family + " " + GivenName.given
          ) +
          " " +
          resData.telecom.map((Telecom: { value: any }) => Telecom.value)
        );
      })
    ).subscribe((transformedData) => {
      this.PatientName.next(transformedData);
    });

    FHIRClient.pipe(
      map((resData) => {
        return resData.address.map(
          (Address: {
            use: any;
            line: any;
            city: any;
            state: any;
            postalCode: any;
            country: any;
          }) =>
            Address.use +
            " " +
            Address.line +
            " " +
            Address.city +
            " " +
            Address.state +
            " " +
            Address.postalCode +
            " " +
            Address.country
        );
      })
    ).subscribe((transformedData) => {
      this.PateintAddress.next(transformedData);
    });

    FHIRClient.pipe(
      map((resData) => {
        return (
          resData.birthDate +
          " " +
          resData.gender +
          " " +
          resData.identifier[0].value
        );
      })
    ).subscribe((transformedData) => {
      this.Dob.next(transformedData);
    });

    // Get Patient Vital Sign Observation

    this.http
      .get<any>(
        "https://r4.smarthealthit.org/Observation?patient=87a339d0-8cae-418e-89c7-8651e6aab3c6"
      )
      .pipe(
        map((resData) => {
          var Observation = resData.entry;
          console.log(Observation);
          for (var c = 0; c < Observation.length; c++)
            return Observation.map(
              (Observation: {
                resource: any;
                valueQuantity: any;
                value: any;
              }) => Observation["resource"]["valueQuantity"]
            );
        })
      )
      .subscribe((transformedData) => {
        this.PatientObs.next(transformedData);
        //console.log(transformedData);
      });

    this.http
      .get<any>(
        "https://r4.smarthealthit.org/Condition?patient=87a339d0-8cae-418e-89c7-8651e6aab3c6"
      )
      .pipe(
        map((resData) => {
          var Condition = resData.entry;
          console.log(Condition);
          for (var c = 0; c < Condition.length; c++)
            return Condition.map(
              (Condition: {
                resource: any;
                clinicalStatus: any;
                code: any;
                coding: any;
                display: any;
              }) => Condition.resource["code"]
            );
        })
      )
      .subscribe((transformedData) => {
        this.PatientCondition.next(transformedData);
        //console.log(transformedData);
      });
  }
}
