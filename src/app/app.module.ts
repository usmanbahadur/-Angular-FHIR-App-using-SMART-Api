import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { PersonComponent } from "./person/person.component";
import { AppComponent } from "./app.component";
import { PersonInputComponent } from "./person/person-input.component";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./person/app-routing.module";
import { HttpClientModule } from "@angular/common/http";
@NgModule({
  declarations: [AppComponent, PersonComponent, PersonInputComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
