import {Component} from '@angular/core';
import { PersonService } from './person.service';
@Component (

  {
selector: 'app-person-input',
templateUrl: './person-input.component.html',
styleUrls:['./person-input.component.css']
  })
export class PersonInputComponent {

enteredPersonName = '';
constructor(private perssonService: PersonService)

{


}
  onCreatePerson() {

console.log ('created a person: ' +  this.enteredPersonName);
//this.perssonService.addPerson(this.enteredPersonName);
this.enteredPersonName = '';
  }
}
