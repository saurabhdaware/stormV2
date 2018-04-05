import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppComponent } from './app.component';
import { PlanetsService } from './services/planets.service';
import { ControllerService } from './services/controller.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [PlanetsService,ControllerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
