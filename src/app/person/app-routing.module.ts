import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PersonComponent} from '../person/person.component';
import {PersonInputComponent} from '../person/person-input.component';

const routes: Routes = [

  {path: '', component:PersonComponent},
  {path: 'input', component: PersonInputComponent}
];

@NgModule ({

 imports: [RouterModule.forRoot(routes)],

 exports: [RouterModule]
})
export class AppRoutingModule {}
