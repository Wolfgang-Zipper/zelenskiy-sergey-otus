import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidentFormComponent } from './components/incident-form/incident-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IncidentTemplateService } from './services/template/incidents-template.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from './services/api-service/api-service.service';
import { HttpClientModule } from '@angular/common/http';
import { DropdownSendComponent } from './components/dropdown-send/dropdown-send.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserManagerComponent } from './services/user-manager/user-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    IncidentFormComponent,
    DropdownSendComponent,
    UserManagerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [IncidentTemplateService, ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
