import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';


@Injectable ({providedIn: 'root'})
export class PersonService {

  PatientName = new Subject <string>();
  PateintAddress = new Subject <string[]>();
  PatientMrn = new Subject <string[]>();
  PatientCond = new Subject <string>();
  PatientMed = new Subject <string[]>();
  Gender = new Subject <string[]>();
  teleCom = new Subject <string[]>();
  Dob = new Subject <string>();
  person: string[];
  address: string [];
  identifier: string[];
  birth: string[];
  CondStatus = new Subject <string>();;



  constructor(private http: HttpClient) {}

  fetchPerson() {


   const FHIRClient =  this.http.get<any>('https://r3.smarthealthit.org/Patient/smart-2113340')

   // Get Patient Deomographics

   FHIRClient.pipe(map(resData => {
    return resData.name.map ((GivenName: {family: any,  given: any}) => GivenName.family + " " + GivenName.given)
     + " " + resData.telecom.map ((Telecom: {value: any}) => Telecom.value);
    }) ).subscribe(transformedData => {
      this.PatientName.next(transformedData);
    });

   FHIRClient.pipe(map(resData => {
    return resData.address.map((Address: { use: any; line: any; city: any; state: any; postalCode: any; country : any;})=>
    Address.use + " " +  Address.line  +" "+ Address.city +" "+ Address.state +" "+ Address.postalCode +" "+ Address.country);
    })).subscribe(transformedData => {
     this.PateintAddress.next(transformedData);
    });

   FHIRClient.pipe(map(resData => {
    return resData.birthDate + ' ' + resData.gender + " " + resData.identifier[0].value; }))
    .subscribe(transformedData => {
    this.Dob.next((transformedData));
    });


    // Get Patient Condition
   this.http.get<any>('https://r3.smarthealthit.org/Condition/smart-Condition-178')
    .pipe(map(resData => {
      return  resData.verificationStatus + " " + resData.clinicalStatus + " " +
      resData.code.coding.map((Condition: {display: any; }) => Condition.display);
    }))
    .subscribe(transformedData =>
     { this.PatientCond.next(transformedData);
    });

  }



}
