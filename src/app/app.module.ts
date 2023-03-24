import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from './api.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { HttpClientModule} from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';
@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  

  
  ],
  providers: [ApiService, LocalstorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
